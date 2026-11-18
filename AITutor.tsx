"use client";

import Link from "next/link";
import {
  AlertCircle, Bot, CircleStop, Eraser, Keyboard, Languages, Mic, MicOff,
  RefreshCw, Send, Settings2, Sparkles, Volume2, VolumeX, Wrench,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, EmptyState, ErrorState, PageIntro, ScopeBadge } from "@/components/ui";
import { getChapter, getSubject, subjects } from "@/lib/curriculum";
import type { ChatMessage, TutorLanguage } from "@/lib/types";

type Mode = "general" | "explain" | "steps" | "practice" | "check" | "diagram";
const modes: Mode[] = ["general", "explain", "steps", "practice", "check", "diagram"];
const languages: TutorLanguage[] = ["english", "hinglish", "hindi"];

interface AiStatus {
  configured: boolean;
  aiConfigured: boolean;
  aiModel: string;
  aiStreaming: boolean;
  setup?: { title: string; message: string; steps: string[]; voiceNote: string };
}

interface SpeechResultLike { isFinal: boolean; 0?: { transcript?: string } }
interface RecognitionEventLike { resultIndex: number; results: ArrayLike<SpeechResultLike> }
interface RecognitionErrorLike { error?: string }
interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
type RecognitionConstructor = new () => RecognitionLike;

function newId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function recognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const candidate = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return candidate.SpeechRecognition ?? candidate.webkitSpeechRecognition ?? null;
}

function recognitionLang(language: TutorLanguage): string {
  return language === "hindi" ? "hi-IN" : "en-IN";
}

function speechLang(language: TutorLanguage): string {
  return language === "hindi" ? "hi-IN" : "en-IN";
}

const quickActions: { label: string; mode: Mode; prompt: string }[] = [
  { label: "Explain simply", mode: "explain", prompt: "Explain the main concept of this chapter in very simple language with one example." },
  { label: "Maths steps", mode: "steps", prompt: "Solve this maths problem step by step and explain why each step works: " },
  { label: "Science diagram", mode: "diagram", prompt: "Explain the diagram and label relationships for this science concept in words." },
  { label: "Practice questions", mode: "practice", prompt: "Generate 3 original practice questions of increasing difficulty on this chapter." },
  { label: "Check my answer", mode: "check", prompt: "Please check my answer and explain any mistake kindly. My answer is: " },
];

export function AITutor({ initialSubject = "", initialChapter = "", initialMode = "general" }: { initialSubject?: string; initialChapter?: string; initialMode?: string }) {
  const { state, mutate, config } = useWorkspace();
  const [subjectId, setSubjectId] = useState(subjects.some((subject) => subject.id === initialSubject) ? initialSubject : "");
  const [chapterId, setChapterId] = useState("");
  const [language, setLanguage] = useState<TutorLanguage>(state.preferences.language);
  const [mode, setMode] = useState<Mode>(modes.includes(initialMode as Mode) ? initialMode as Mode : "general");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => state.chatMessages);
  const [status, setStatus] = useState<AiStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [setupDetails, setSetupDetails] = useState<string[] | null>(null);
  const [sending, setSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [micMessage, setMicMessage] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  const recognitionRef = useRef<RecognitionLike | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastPromptRef = useRef("");
  const listeningRef = useRef(false);
  const sendingRef = useRef(false);
  const speakingRef = useRef(false);
  const voiceModeRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subject = getSubject(subjectId);
  const chapter = useMemo(() => {
    const valid = getChapter(chapterId);
    return valid && valid.subjectId === subjectId ? valid : undefined;
  }, [chapterId, subjectId]);
  const chapters = subject?.chapters ?? [];
  const aiReady = Boolean(status?.aiConfigured ?? config.aiConfigured);
  const speechOn = state.preferences.speechEnabled;

  useEffect(() => {
    if (initialChapter && getChapter(initialChapter)?.subjectId === subjectId) setChapterId(initialChapter);
    // Apply URL context once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { voiceModeRef.current = voiceMode; }, [voiceMode]);
  useEffect(() => { setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window); setRecognitionSupported(Boolean(recognitionConstructor())); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ block: "nearest" }); }, [messages, sending]);

  const loadStatus = useCallback(async () => {
    setStatusLoading(true);
    setStatusError(null);
    try {
      const response = await fetch("/api/ai/status", { cache: "no-store" });
      if (!response.ok) throw new Error(`Status check failed (${response.status})`);
      setStatus(await response.json() as AiStatus);
    } catch (cause) {
      setStatusError(cause instanceof Error ? cause.message : "Could not check AI status.");
    } finally {
      setStatusLoading(false);
    }
  }, []);

  useEffect(() => { void loadStatus(); }, [loadStatus]);

  useEffect(() => () => {
    abortRef.current?.abort();
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    recognitionRef.current?.abort();
    listeningRef.current = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  async function ensureMicPermission(): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicMessage("Microphone permission check is unavailable in this browser. Try Chrome or Edge with HTTPS/localhost, or type your question.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // The stream is only a permission probe; audio is never recorded or stored.
      stream.getTracks().forEach((track) => track.stop());
      setMicMessage("Microphone access granted. Only the recognised text transcript is used.");
      return true;
    } catch {
      setMicMessage("Microphone permission was denied or no microphone was found. Allow access in your browser settings, or use the text box.");
      return false;
    }
  }

  const startRecognitionOnly = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition || listeningRef.current) return;
    try {
      recognition.start();
      listeningRef.current = true;
      setIsListening(true);
    } catch {
      // Browser may still be stopping the previous recognition; onend will retry in voice mode.
    }
  }, []);

  const speakAnswer = useCallback((text: string) => {
    if (!speechOn || !speechSupported || !text.trim()) {
      if (voiceModeRef.current) {
        restartTimerRef.current = setTimeout(() => startRecognitionOnly(), 350);
      }
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLang(language);
      utterance.rate = language === "hindi" ? 0.92 : 0.98;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((item) => item.lang.toLowerCase().startsWith(speechLang(language).slice(0, 2).toLowerCase()));
      if (voice) utterance.voice = voice;
      utterance.onstart = () => { speakingRef.current = true; setIsSpeaking(true); };
      const finish = () => {
        speakingRef.current = false;
        setIsSpeaking(false);
        if (voiceModeRef.current) restartTimerRef.current = setTimeout(() => startRecognitionOnly(), 350);
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
      speakingRef.current = false;
    }
  }, [language, speechOn, speechSupported, startRecognitionOnly]);

  const sendMessage = useCallback(async (override?: string, fromVoice = false) => {
    const text = (override ?? input).trim();
    if (!text || sendingRef.current || !aiReady) return;
    sendingRef.current = true;
    setSending(true);
    setChatError(null);
    setSetupDetails(null);
    setInput("");
    lastPromptRef.current = text;
    recognitionRef.current?.stop();
    listeningRef.current = false;
    setIsListening(false);

    const userMessage: ChatMessage = { id: newId(), role: "user", content: text.slice(0, 3000), language, subjectId, createdAt: new Date().toISOString() };
    const history = [...messages, userMessage].slice(-12);
    setMessages((current) => [...current, userMessage]);

    const assistantId = newId();
    let full = "";
    let placeholder = false;
    const controller = new AbortController();
    abortRef.current = controller;

    const updateAssistant = (content: string) => {
      if (!placeholder) {
        placeholder = true;
        setMessages((current) => [...current, { id: assistantId, role: "assistant", content, language, subjectId, createdAt: new Date().toISOString() }]);
      } else {
        setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content } : message));
      }
    };

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.map((message) => ({ role: message.role, content: message.content })),
          language,
          subjectId,
          chapterId: chapter?.id ?? "",
          mode,
          stream: status?.aiStreaming ?? config.aiStreaming,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({})) as { error?: string; message?: string; setup?: { steps?: string[]; example?: string } };
        if (body.error === "AI_NOT_CONFIGURED") {
          setSetupDetails([...(body.setup?.steps ?? []), body.setup?.example ?? ""].filter(Boolean));
        }
        throw new Error(body.message || `AI request failed (${response.status})`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          buffer += decoder.decode(part.value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data) as { delta?: string; message?: string };
              if (parsed.message) setChatError(parsed.message);
              if (parsed.delta) { full += parsed.delta; updateAssistant(full); }
            } catch { /* Ignore provider keep-alive frames. */ }
          }
        }
      } else {
        const body = await response.json() as { content?: string };
        full = body.content ?? "";
        if (full) updateAssistant(full);
      }

      if (!full.trim()) throw new Error("The AI provider returned no text. Please try again.");
      await mutate({ type: "appendChat", messages: [
        { role: "user", content: userMessage.content, language, subjectId },
        { role: "assistant", content: full, language, subjectId },
      ] });
      if (fromVoice || speechOn) speakAnswer(full);
      else if (voiceModeRef.current) restartTimerRef.current = setTimeout(() => startRecognitionOnly(), 350);
    } catch (cause) {
      if (!placeholder) setMessages((current) => current.filter((message) => message.id !== assistantId));
      const aborted = cause instanceof DOMException && cause.name === "AbortError";
      setChatError(aborted ? "Response stopped." : (cause instanceof Error ? cause.message : "Could not reach the AI tutor."));
      if (voiceModeRef.current && !aborted) restartTimerRef.current = setTimeout(() => startRecognitionOnly(), 600);
    } finally {
      abortRef.current = null;
      sendingRef.current = false;
      setSending(false);
    }
  }, [aiReady, chapter, config.aiStreaming, input, language, messages, mode, mutate, speakAnswer, startRecognitionOnly, status?.aiStreaming, subjectId, speechOn]);

  async function startListening() {
    const Constructor = recognitionConstructor();
    if (!Constructor) {
      setMicMessage("Speech recognition is not supported in this browser. Chrome or Edge usually supports the Web Speech API; typed questions work everywhere.");
      return;
    }
    if (!(await ensureMicPermission())) return;
    let recognition = recognitionRef.current;
    if (!recognition) {
      recognition = new Constructor();
      recognitionRef.current = recognition;
    }
    recognition.lang = recognitionLang(language);
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finalText = "";
      let interim = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) finalText += transcript;
        else interim += transcript;
      }
      if (finalText.trim() || interim.trim()) setInput((finalText || interim).trim());
      if (finalText.trim() && voiceModeRef.current && !sendingRef.current) {
        setInput("");
        recognitionRef.current?.stop();
        listeningRef.current = false;
        setIsListening(false);
        void sendMessage(finalText.trim(), true);
      }
    };
    recognition.onerror = (event) => {
      listeningRef.current = false;
      setIsListening(false);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") setMicMessage("Microphone permission was denied. Allow it in your browser's site settings, or type instead.");
      else if (event.error === "no-speech") setMicMessage("No speech detected. Try again or use the text box.");
      else setMicMessage(`Speech recognition stopped: ${event.error ?? "unknown error"}. You can keep typing.`);
    };
    recognition.onend = () => {
      listeningRef.current = false;
      setIsListening(false);
      if (voiceModeRef.current && !sendingRef.current && !speakingRef.current) {
        restartTimerRef.current = setTimeout(() => startRecognitionOnly(), 350);
      }
    };
    startRecognitionOnly();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    listeningRef.current = false;
    setIsListening(false);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
  }

  async function toggleVoiceMode() {
    if (voiceMode) {
      voiceModeRef.current = false;
      setVoiceMode(false);
      stopListening();
      if (speechSupported) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speakingRef.current = false;
      return;
    }
    voiceModeRef.current = true;
    setVoiceMode(true);
    await startListening();
  }

  function clearConversation() {
    abortRef.current?.abort();
    voiceModeRef.current = false;
    setVoiceMode(false);
    stopListening();
    if (speechSupported) window.speechSynthesis.cancel();
    setMessages([]);
    setChatError(null);
    setInput("");
    void mutate({ type: "clearChat" });
  }

  function replayLast() {
    const last = [...messages].reverse().find((message) => message.role === "assistant");
    if (last) speakAnswer(last.content);
  }

  function stopResponse() {
    abortRef.current?.abort();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
    if (event.altKey && event.key.toLowerCase() === "m") {
      event.preventDefault();
      if (isListening) stopListening(); else void startListening();
    }
  }

  return (
    <div className="animate-enter space-y-6">
      <PageIntro
        eyebrow="Core feature"
        title="Minus AI Tutor"
        description="A friendly, patient tutor for Class 10 concepts — in Hindi, Hinglish or English. Ask, listen, practise and learn without pressure."
        action={<Link href="/settings" className="btn-secondary"><Settings2 size={16} aria-hidden="true" />AI & voice settings</Link>}
      />

      {!aiReady && (
        <Card className="border-amber-200 bg-amber-50 p-5" >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Wrench size={22} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-bold text-amber-950">{statusLoading ? "Checking AI setup…" : "AI Tutor needs server configuration"}</h2>
              <p className="mt-1 text-sm leading-relaxed text-amber-900">{status?.setup?.message ?? "No AI API key is configured. Minus Study will not generate fake tutor answers."}</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-amber-900">
                {(setupDetails ?? status?.setup?.steps ?? ["Set AI_API_KEY and AI_MODEL in the server environment, then restart."]).map((step, index) => <li key={index}>{step}</li>)}
              </ol>
              <p className="mt-3 text-xs font-medium text-amber-800">Keys stay server-side. Never prefix an AI key with NEXT_PUBLIC_.</p>
            </div>
            <button type="button" className="btn-secondary shrink-0" onClick={() => void loadStatus()} disabled={statusLoading}><RefreshCw size={15} aria-hidden="true" />Recheck</button>
          </div>
        </Card>
      )}
      {statusError && <ErrorState message={statusError} onRetry={() => void loadStatus()} />}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
        <Card className="flex min-h-[620px] flex-col overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Bot size={19} aria-hidden="true" /></span>
              <div><p className="text-sm font-bold text-slate-900">Conversation</p><p className="text-xs text-slate-500">{messages.length} text message{messages.length === 1 ? "" : "s"} in this session</p></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-ghost border border-slate-200" onClick={replayLast} disabled={isSpeaking || !speechOn || !speechSupported || !messages.some((message) => message.role === "assistant")}><Volume2 size={15} aria-hidden="true" />Replay answer</button>
              {isSpeaking && <button type="button" className="btn-ghost border border-slate-200" onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); speakingRef.current = false; }}><VolumeX size={15} aria-hidden="true" />Stop voice</button>}
              <button type="button" className="btn-ghost border border-slate-200" onClick={clearConversation} disabled={messages.length === 0}><Eraser size={15} aria-hidden="true" />Clear</button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-4 py-5 sm:px-5" aria-label="Conversation history" aria-live="polite">
            {messages.length === 0 ? (
              <EmptyState
                title={aiReady ? "Ask your first question" : "AI chat is paused until setup is complete"}
                description={aiReady ? "Try: 'Explain photosynthesis step by step', 'Give me 3 trigonometry questions', or 'Check my answer kindly'. Choose a mode or use a quick prompt below." : "Configure a server-side AI key using the instructions above. Your microphone and text are never sent without a configured provider."}
                icon={<Sparkles size={20} aria-hidden="true" />}
              />
            ) : messages.map((message) => (
              <article key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === "user" ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide opacity-70">{message.role === "user" ? "You" : "Minus AI Tutor"}</p>
                  <div className="whitespace-pre-wrap">{message.content || <span className="inline-flex gap-1"><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-500" /><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-500 [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-500 [animation-delay:300ms]" /></span>}</div>
                </div>
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
            {chatError && <div className="mb-3"><ErrorState message={chatError} onRetry={aiReady ? () => { setChatError(null); void sendMessage(lastPromptRef.current || input); } : undefined} /></div>}
            <div className="mb-3 flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${mode === action.mode ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
                  onClick={() => { setMode(action.mode); setInput(action.prompt); inputRef.current?.focus(); }}
                >
                  {action.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <label htmlFor="tutor-input" className="sr-only">Type your question</label>
                <textarea
                  ref={inputRef}
                  id="tutor-input"
                  className="input min-h-[92px] resize-y py-3 pr-3"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={3000}
                  disabled={!aiReady || sending}
                  placeholder={aiReady ? "Type your question… (Enter to send, Shift+Enter for a new line, Alt+M for microphone)" : "Configure the AI key to enable chat…"}
                />
              </div>
              <button
                type="button"
                className={`btn-secondary shrink-0 self-start px-3 ${isListening ? "border-rose-300 bg-rose-50 text-rose-700" : ""}`}
                onClick={() => isListening ? stopListening() : void startListening()}
                disabled={!aiReady || !recognitionSupported || sending}
                aria-label={isListening ? "Stop listening" : "Start listening"}
                title="Microphone input (Alt+M)"
              >
                {isListening ? <MicOff size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-500"><Keyboard size={14} aria-hidden="true" />Enter to send · Shift+Enter new line · Alt+M microphone</p>
              <div className="flex gap-2">
                {sending && <button type="button" className="btn-secondary" onClick={stopResponse}><CircleStop size={15} aria-hidden="true" />Stop response</button>}
                <button type="button" className="btn-primary" onClick={() => void sendMessage()} disabled={!aiReady || sending || !input.trim()}><Send size={16} aria-hidden="true" />Send</button>
              </div>
            </div>
            {micMessage && <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-xs leading-relaxed text-slate-600" role="status">{micMessage}</p>}
          </div>
        </Card>

        <aside className="order-first space-y-4 lg:order-last" aria-label="AI Tutor controls">
          <Card className="p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Languages size={17} className="text-blue-600" aria-hidden="true" />Tutor settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="tutor-language" className="mb-1.5 block text-xs font-bold text-slate-600">Language</label>
                <select id="tutor-language" className="input" value={language} onChange={(event) => setLanguage(event.target.value as TutorLanguage)}>
                  <option value="english">English</option><option value="hinglish">Hinglish</option><option value="hindi">हिन्दी</option>
                </select>
              </div>
              <div>
                <label htmlFor="tutor-subject" className="mb-1.5 block text-xs font-bold text-slate-600">Subject</label>
                <select id="tutor-subject" className="input" value={subjectId} onChange={(event) => { setSubjectId(event.target.value); setChapterId(""); }}>
                  <option value="">General Class 10</option>
                  {subjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="tutor-chapter" className="mb-1.5 block text-xs font-bold text-slate-600">Chapter context</label>
                <select id="tutor-chapter" className="input" value={chapterId} onChange={(event) => setChapterId(event.target.value)} disabled={!subject}>
                  <option value="">No specific chapter</option>
                  {chapters.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="tutor-mode" className="mb-1.5 block text-xs font-bold text-slate-600">Answer style</label>
                <select id="tutor-mode" className="input" value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
                  <option value="general">Friendly general answer</option>
                  <option value="explain">Explain simply</option>
                  <option value="steps">Step-by-step maths</option>
                  <option value="diagram">Science diagram / concept</option>
                  <option value="practice">Generate practice questions</option>
                  <option value="check">Check my answer</option>
                </select>
              </div>
            </div>
            {chapter && <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><ScopeBadge scope={chapter.scope} /><p className="mt-2 text-xs leading-relaxed text-slate-600">{chapter.scopeNote}</p></div>}
          </Card>

          <Card className="p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Mic size={17} className="text-blue-600" aria-hidden="true" />Voice conversation</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Browser speech recognition turns speech into text; browser speech synthesis reads answers aloud. Continuous mode listens again after each answer.</p>
            <div className="mt-4 space-y-2">
              <button type="button" className={`w-full ${voiceMode ? "btn-secondary border-rose-200 bg-rose-50 text-rose-700" : "btn-primary"}`} onClick={() => void toggleVoiceMode()} disabled={!aiReady || !recognitionSupported}>
                {voiceMode ? <><CircleStop size={16} aria-hidden="true" />Stop conversation mode</> : <><Mic size={16} aria-hidden="true" />Start conversation mode</>}
              </button>
              <button type="button" className="btn-secondary w-full" onClick={() => isListening ? stopListening() : void startListening()} disabled={!aiReady || !recognitionSupported || sending}>
                {isListening ? <><MicOff size={16} aria-hidden="true" />Stop listening</> : <><Mic size={16} aria-hidden="true" />Start listening</>}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge tone={isListening ? "green" : "slate"}>{isListening ? "Listening" : "Mic idle"}</Badge>
              <Badge tone={isSpeaking ? "blue" : "slate"}>{isSpeaking ? "Speaking" : "Speaker idle"}</Badge>
              <Badge tone={speechOn ? "green" : "amber"}>Spoken answers {speechOn ? "on" : "off"}</Badge>
            </div>
            {(!recognitionSupported || !speechSupported) && <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-amber-800"><AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />One or more Web Speech features are unavailable in this browser. Text chat still works; Chrome or Edge on HTTPS/localhost offers the widest support.</p>}
          </Card>

          <Card className="border-blue-100 bg-blue-50/50 p-5">
            <h2 className="text-sm font-bold text-slate-900">Privacy & architecture</h2>
            <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
              <li>No raw voice recordings are stored or uploaded. Only recognised text may be saved as a chat message.</li>
              <li>{state.preferences.saveChatHistory ? "Text conversation history is saved to your private workspace." : "Text history saving is off in Settings; the current session remains on screen only."}</li>
              <li>AI requests go through a server route; API keys are never in browser code. The streaming chat adapter can be replaced with a low-latency conversational voice API later.</li>
            </ul>
            <Link href="/settings" className="mt-3 inline-block text-xs font-bold text-blue-700 hover:underline">Change history & voice preferences →</Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
