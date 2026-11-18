"use client";

import type { TutorLanguage } from "@/lib/optional-v1/ai/tutorProvider";

/**
 * VoiceTransportAdapter abstracts the voice I/O layer.
 * Today Minus Study uses the lightweight Browser SpeechRecognition + SpeechSynthesis adapter
 * (zero audio recording storage, zero extra latency on low-end phones).
 * Later, a WebRTC / Realtime Voice API implementation can satisfy the exact same interface.
 */
export interface VoiceTransportCapabilities {
  recognitionSupported: boolean;
  synthesisSupported: boolean;
  mode: "browser-speech-api" | "realtime-voice-api";
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const win = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null;
}

export function getVoiceCapabilities(): VoiceTransportCapabilities {
  if (typeof window === "undefined") {
    return {
      recognitionSupported: false,
      synthesisSupported: false,
      mode: "browser-speech-api",
    };
  }
  return {
    recognitionSupported: Boolean(getSpeechRecognitionCtor()),
    synthesisSupported: "speechSynthesis" in window,
    mode: "browser-speech-api",
  };
}

export function languageToBcp47(language: TutorLanguage): string {
  switch (language) {
    case "hindi":
      return "hi-IN";
    case "hinglish":
      return "en-IN";
    case "english":
    default:
      return "en-IN";
  }
}

export async function requestMicrophonePermission(): Promise<{
  granted: boolean;
  error?: string;
}> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return {
      granted: false,
      error: "Microphone access API is unavailable in this browser or non-HTTPS context.",
    };
  }

  try {
    // Request stream strictly to verify permission, then immediately stop tracks.
    // Minus Study NEVER records or stores raw voice audio.
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return { granted: true };
  } catch (err) {
    if (err instanceof DOMException && err.name === "NotAllowedError") {
      return {
        granted: false,
        error:
          "Microphone permission was blocked. Please allow microphone access in your browser's address bar settings.",
      };
    }
    if (err instanceof DOMException && err.name === "NotFoundError") {
      return {
        granted: false,
        error: "No microphone was detected on this device.",
      };
    }
    return {
      granted: false,
      error: "Could not access microphone. Please check device permissions.",
    };
  }
}

export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " Code block omitted. ")
    .replace(/[*#_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export class BrowserVoiceAdapter {
  private recognition: SpeechRecognitionLike | null = null;

  startListening(options: {
    language: TutorLanguage;
    onStart?: () => void;
    onInterim?: (text: string) => void;
    onFinal: (text: string) => void;
    onEnd?: () => void;
    onError?: (friendlyError: string) => void;
  }): boolean {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      options.onError?.(
        "Voice recognition is not supported in this browser. Try Chrome, Edge, or Android Chrome."
      );
      return false;
    }

    this.stopListening();

    const recognition = new Ctor();
    recognition.lang = languageToBcp47(options.language);
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      options.onStart?.();
    };

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalTranscript += `${transcript} `;
        } else {
          interim += transcript;
        }
      }
      if (interim.trim()) {
        options.onInterim?.(interim.trim());
      }
    };

    recognition.onerror = (event) => {
      const map: Record<string, string> = {
        "not-allowed":
          "Microphone permission denied. Enable microphone access in browser settings to speak.",
        "service-not-allowed":
          "Speech recognition service is disabled in this browser.",
        "no-speech":
          "No speech was heard. Tap Start Listening again and speak clearly near the mic.",
        "audio-capture": "No microphone found. Please connect a microphone.",
        network: "Speech recognition requires an active internet connection.",
        aborted: "",
      };
      const msg = map[event.error] ?? `Voice input error (${event.error}).`;
      if (msg) options.onError?.(msg);
    };

    recognition.onend = () => {
      const cleaned = finalTranscript.trim();
      if (cleaned) {
        options.onFinal(cleaned);
      }
      options.onEnd?.();
    };

    this.recognition = recognition;
    try {
      recognition.start();
      return true;
    } catch {
      options.onError?.("Could not start microphone listening right now. Please try again.");
      return false;
    }
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore already-stopped recognition instance
      }
      this.recognition = null;
    }
  }

  speak(options: {
    text: string;
    language: TutorLanguage;
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      options.onEnd?.();
      return false;
    }

    this.stopSpeaking();
    const cleaned = cleanTextForSpeech(options.text);
    if (!cleaned) {
      options.onEnd?.();
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(cleaned);
    const targetLang = languageToBcp47(options.language);
    utterance.lang = targetLang;
    utterance.rate = Math.min(1.5, Math.max(0.7, options.rate ?? 1.0));

    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
      voices.find((v) =>
        v.lang.toLowerCase().startsWith(options.language === "hindi" ? "hi" : "en")
      );
    if (preferred) {
      utterance.voice = preferred;
    }

    utterance.onstart = () => options.onStart?.();
    utterance.onend = () => options.onEnd?.();
    utterance.onerror = () => options.onEnd?.();

    window.speechSynthesis.speak(utterance);
    return true;
  }

  stopSpeaking(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}
