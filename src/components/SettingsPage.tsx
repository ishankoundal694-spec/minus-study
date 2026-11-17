"use client";

import {
  Bot, Check, Database, Download, ExternalLink, KeyRound, LockKeyhole,
  Mail, RefreshCw, ShieldCheck, Trash2, Volume2, VolumeX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, PageIntro, SectionTitle } from "@/components/ui";
import { OFFICIAL_LINKS } from "@/lib/curriculum";
import type { Preferences, TutorLanguage } from "@/lib/types";

const languageOptions: { value: TutorLanguage; label: string }[] = [
  { value: "english", label: "English" },
  { value: "hinglish", label: "Hinglish" },
  { value: "hindi", label: "हिन्दी" },
];

function sampleFor(language: TutorLanguage): { text: string; lang: string } {
  if (language === "hindi") return { text: "नमस्ते! मैं माइनस एआई ट्यूटर हूँ। चलिए, कदम दर कदम सीखते हैं।", lang: "hi-IN" };
  if (language === "hinglish") return { text: "Namaste! Main Minus AI Tutor hoon. Chalo, step by step seekhte hain.", lang: "en-IN" };
  return { text: "Hello! I am Minus AI Tutor. Let us learn step by step.", lang: "en-IN" };
}

export function SettingsPage() {
  const {
    state, mutate, saving, config, backend, email, refresh,
    authBusy, authMessage, signIn, signOut,
  } = useWorkspace();
  const [prefs, setPrefs] = useState<Preferences>(state.preferences);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => { setPrefs(state.preferences); }, [state.preferences]);
  useEffect(() => { document.documentElement.classList.toggle("compact-mode", state.preferences.compactMode); }, [state.preferences.compactMode]);
  useEffect(() => { setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window); }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const result = await mutate({ type: "savePreferences", preferences: prefs });
    setSaveMessage(result ? "Preferences saved to your private workspace." : "Could not save preferences. Try again.");
  }

  function testVoice() {
    if (!speechSupported) return;
    const sample = sampleFor(prefs.language);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sample.text);
    utterance.lang = sample.lang;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "minus-study-workspace.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Personalise"
        title="Settings"
        description="Choose your language, voice and study preferences. No unnecessary personal information is required."
        action={<button type="button" className="btn-secondary" onClick={() => void refresh()}><RefreshCw size={15} aria-hidden="true" />Refresh status</button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Study preferences" description="Saved automatically when you press Save." />
          <form onSubmit={save} className="space-y-4">
            <div>
              <label htmlFor="display-name" className="mb-1.5 block text-xs font-bold text-slate-600">Display name</label>
              <input id="display-name" className="input" value={prefs.displayName} maxLength={40} onChange={(event) => setPrefs({ ...prefs, displayName: event.target.value })} placeholder="Student" />
              <p className="mt-1 text-xs text-slate-500">Used only in your dashboard greeting.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="preferred-language" className="mb-1.5 block text-xs font-bold text-slate-600">Preferred language</label>
                <select id="preferred-language" className="input" value={prefs.language} onChange={(event) => setPrefs({ ...prefs, language: event.target.value as TutorLanguage })}>
                  {languageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="daily-goal" className="mb-1.5 block text-xs font-bold text-slate-600">Daily study goal (minutes)</label>
                <input id="daily-goal" type="number" min={10} max={480} step={5} className="input" value={prefs.dailyGoalMinutes} onChange={(event) => setPrefs({ ...prefs, dailyGoalMinutes: Number(event.target.value) })} />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { key: "speechEnabled" as const, title: "Spoken AI answers", description: "Read tutor replies aloud using browser speech synthesis." },
                { key: "compactMode" as const, title: "Compact layout", description: "Slightly tighter spacing and line height for smaller screens." },
                { key: "saveChatHistory" as const, title: "Save text conversation history", description: "Store tutor chat text in your private workspace. Raw audio is never stored." },
              ].map((option) => (
                <label key={option.key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-200">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-blue-600" checked={prefs[option.key]} onChange={(event) => setPrefs({ ...prefs, [option.key]: event.target.checked })} />
                  <span><span className="block text-sm font-semibold text-slate-800">{option.title}</span><span className="block text-xs leading-relaxed text-slate-500">{option.description}</span></span>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="btn-primary" disabled={saving}><Check size={16} aria-hidden="true" />Save preferences</button>
              <button type="button" className="btn-secondary" disabled={!speechSupported || speaking} onClick={testVoice}><Volume2 size={15} aria-hidden="true" />Test voice</button>
              {speaking && <button type="button" className="btn-secondary" onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }}><VolumeX size={15} aria-hidden="true" />Stop voice</button>}
            </div>
            {saveMessage && <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800" role="status">{saveMessage}</p>}
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <SectionTitle title="Workspace & privacy" description="How your study data is stored." />
            <div className="flex flex-wrap gap-2">
              <Badge tone={backend === "supabase" ? "green" : "blue"}>{backend === "supabase" ? "Supabase account workspace" : "Private browser workspace"}</Badge>
              <Badge tone="slate">{state.progress.length} chapter updates</Badge>
              <Badge tone="slate">{state.quizAttempts.length} quiz attempts</Badge>
              <Badge tone="slate">{state.syllabusItems.length} syllabus items</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {backend === "supabase"
                ? "Your signed-in records are scoped to your user id by Supabase Row Level Security policies. Only you can read or update your row."
                : "Your records are tied to a random HTTP-only cookie in this browser. They are not presented as a cross-device account. Sign in with Supabase to sync."}
            </p>
            <div className="mt-4 space-y-2">
              <button type="button" className="btn-secondary w-full justify-start" onClick={exportData}><Download size={16} aria-hidden="true" />Export my data (JSON)</button>
              <button type="button" className="btn-secondary w-full justify-start" disabled={state.chatMessages.length === 0 || saving} onClick={() => void mutate({ type: "clearChat" })}><Trash2 size={16} aria-hidden="true" />Clear saved chat text</button>
              <button type="button" className="btn-secondary w-full justify-start" disabled={state.activity.length === 0 || saving} onClick={() => void mutate({ type: "clearActivity" })}><Trash2 size={16} aria-hidden="true" />Clear activity timeline</button>
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-slate-500"><ShieldCheck size={14} className="mt-0.5 shrink-0" aria-hidden="true" />Microphone audio is never recorded or uploaded. Only recognised text can be saved, and you can turn that off above.</p>
          </Card>

          <Card className="p-5 sm:p-6">
            <SectionTitle title="Supabase sign-in" description="Optional email link — no password or extra personal details." />
            {email ? (
              <div className="space-y-3">
                <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">Signed in as {email}</p>
                <button type="button" className="btn-secondary w-full" disabled={authBusy} onClick={() => void signOut()}>Sign out</button>
              </div>
            ) : config.supabaseConfigured ? (
              <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); void signIn(authEmail); }}>
                <label htmlFor="auth-email" className="sr-only">Email for sign-in link</label>
                <div className="relative"><Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input id="auth-email" type="email" required className="input pl-10" placeholder="you@example.com" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} /></div>
                <button type="submit" className="btn-primary w-full" disabled={authBusy}><LockKeyhole size={16} aria-hidden="true" />Send secure sign-in link</button>
              </form>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-950">Supabase is not configured</p>
                <p className="mt-1 text-sm leading-relaxed text-amber-900">Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, run the RLS migration in supabase/migrations, then restart. The app remains fully usable with a private browser workspace.</p>
              </div>
            )}
            {authMessage && <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700" role="status">{authMessage}</p>}
            <p className="mt-3 text-xs leading-relaxed text-slate-500">The anon/public key is safe for the browser; the service-role key is never used here. Server routes verify the access token before any Supabase read or write.</p>
          </Card>
        </div>
      </div>

      <Card className="p-5 sm:p-6">
        <SectionTitle title="Minus AI Tutor setup" description="Server-side integration · no fake responses." />
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={config.aiConfigured ? "green" : "amber"}>{config.aiConfigured ? "AI key configured" : "AI key missing"}</Badge>
              <Badge tone="slate">Model: {config.aiModel}</Badge>
              <Badge tone="slate">Streaming: {config.aiStreaming ? "on" : "off"}</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Chat requests are proxied through <code className="rounded bg-slate-100 px-1.5 py-0.5">/api/ai/chat</code>. The API key is read only on the server and is never bundled into frontend code. Without a key, the tutor shows these instructions and sends no invented answers.</p>
            <p className="mt-2 text-xs leading-relaxed text-amber-800">A configured key can still be rejected by the provider for exhausted credits or quota (HTTP 429). Add provider credits or replace the key; the tutor displays the provider error instead of inventing a reply.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="/api/ai/status" target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={15} aria-hidden="true" />View public status</a>
              <button type="button" className="btn-secondary" onClick={() => void refresh()}><RefreshCw size={15} aria-hidden="true" />Recheck</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
            <p className="mb-2 flex items-center gap-2 font-bold text-blue-300"><KeyRound size={15} aria-hidden="true" />.env (server-only)</p>
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono">{`AI_API_KEY=your-server-only-key
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1
AI_STREAMING=true

NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
DATABASE_URL=postgresql://…`}</pre>
            <p className="mt-3 text-slate-300">Any OpenAI-compatible chat-completions provider can be used by setting AI_BASE_URL and a compatible AI_MODEL. The streaming adapter is isolated in the backend so a low-latency conversational voice API can replace the browser speech layer later without changing UI state.</p>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Database size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
            <div><h2 className="font-bold text-slate-900">Curriculum sources</h2><p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">The official HPBOSE 2026–27 book list and syllabi determine the curriculum references. NCERT books are linked at the official portal where prescribed; not every NCERT chapter is in the HPBOSE examination syllabus.</p></div>
          </div>
          <a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0"><ExternalLink size={15} aria-hidden="true" />Official book list</a>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-blue-700">
          <a href={OFFICIAL_LINKS.hpboseHome} target="_blank" rel="noopener noreferrer" className="hover:underline">HPBOSE <ExternalLink size={12} className="inline" aria-hidden="true" /></a>
          <a href={OFFICIAL_LINKS.ncertTextbookPortal} target="_blank" rel="noopener noreferrer" className="hover:underline">NCERT textbook portal <ExternalLink size={12} className="inline" aria-hidden="true" /></a>
          <span className="inline-flex items-center gap-1 text-slate-500"><Bot size={14} aria-hidden="true" />No personal student profile required.</span>
        </div>
      </Card>
    </div>
  );
}
