"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import { ErrorState, LoadingState } from "@/components/ui";
import type { Preferences, WorkspaceAction, WorkspaceState } from "@/lib/types";

const initialPreferences: Preferences = {
  displayName: "Student",
  language: "english",
  dailyGoalMinutes: 60,
  speechEnabled: true,
  compactMode: false,
  saveChatHistory: true,
};

const initialState: WorkspaceState = {
  progress: [],
  goals: [],
  quizAttempts: [],
  activity: [],
  chatMessages: [],
  syllabusItems: [],
  preferences: initialPreferences,
};

interface PublicConfig {
  supabaseConfigured: boolean;
  aiConfigured: boolean;
  aiModel: string;
  aiStreaming: boolean;
}

const defaultConfig: PublicConfig = {
  supabaseConfigured: false,
  aiConfigured: false,
  aiModel: "not-configured",
  aiStreaming: false,
};

interface WorkspaceValue {
  state: WorkspaceState;
  loading: boolean;
  saving: boolean;
  error: string | null;
  config: PublicConfig;
  backend: "local" | "supabase";
  email: string | null;
  authBusy: boolean;
  authMessage: string | null;
  refresh: () => Promise<void>;
  mutate: (action: WorkspaceAction) => Promise<WorkspaceState | null>;
  clearError: () => void;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

let browserSupabase: SupabaseClient | null = null;
function supabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!browserSupabase) {
    browserSupabase = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return browserSupabase;
}

async function authHeaders(): Promise<Record<string, string>> {
  const client = supabaseClient();
  if (!client) return {};
  try {
    const { data } = await client.auth.getSession();
    return data.session?.access_token ? { "x-supabase-token": data.session.access_token } : {};
  } catch {
    return {};
  }
}

async function readError(response: Response): Promise<string> {
  try {
    const body = await response.json() as { error?: string; message?: string };
    return body.message || body.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(initialState);
  const [config, setConfig] = useState<PublicConfig>(defaultConfig);
  const [backend, setBackend] = useState<"local" | "supabase">("local");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const busyCount = useRef(0);

  const startSaving = useCallback(() => {
    busyCount.current += 1;
    setSaving(true);
  }, []);
  const endSaving = useCallback(() => {
    busyCount.current = Math.max(0, busyCount.current - 1);
    if (busyCount.current === 0) setSaving(false);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await authHeaders();
      const response = await fetch("/api/workspace", { cache: "no-store", credentials: "same-origin", headers });
      if (!response.ok) throw new Error(await readError(response));
      const data = await response.json() as {
        state: WorkspaceState;
        config: PublicConfig;
        backend: "local" | "supabase";
        email: string | null;
      };
      setState(data.state);
      setConfig(data.config ?? defaultConfig);
      setBackend(data.backend ?? "local");
      setEmail(data.email ?? null);
      setLoaded(true);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load your study space.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    // Initial load only; auth changes trigger the listener below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const client = supabaseClient();
    if (!client) return;
    void client.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: listener } = client.auth.onAuthStateChange(() => {
      void client.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
      void refresh();
    });
    return () => listener.subscription.unsubscribe();
  }, [refresh]);

  const mutate = useCallback((action: WorkspaceAction): Promise<WorkspaceState | null> => {
    const job = queue.current.then(async (): Promise<WorkspaceState | null> => {
      startSaving();
      try {
        const headers = await authHeaders();
        const response = await fetch("/api/workspace", {
          method: "PATCH",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify({ action }),
        });
        if (!response.ok) throw new Error(await readError(response));
        const data = await response.json() as {
          state: WorkspaceState;
          config: PublicConfig;
          backend: "local" | "supabase";
          email: string | null;
        };
        setState(data.state);
        setConfig(data.config ?? defaultConfig);
        setBackend(data.backend ?? "local");
        setEmail(data.email ?? null);
        setError(null);
        return data.state;
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save your changes.");
        return null;
      } finally {
        endSaving();
      }
    });
    queue.current = job.catch(() => undefined);
    return job;
  }, [endSaving, startSaving]);

  const signIn = useCallback(async (address: string) => {
    const client = supabaseClient();
    if (!client) {
      setAuthMessage("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable email sign-in.");
      return;
    }
    setAuthBusy(true);
    setAuthMessage(null);
    const { error: authError } = await client.auth.signInWithOtp({
      email: address.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setAuthMessage(authError ? authError.message : "Check your email for a secure sign-in link. No password or extra personal details are needed.");
    setAuthBusy(false);
  }, []);

  const signOut = useCallback(async () => {
    const client = supabaseClient();
    if (!client) return;
    setAuthBusy(true);
    const { error: authError } = await client.auth.signOut();
    setAuthMessage(authError ? authError.message : "Signed out. This browser will use its private local workspace.");
    setAuthBusy(false);
    await refresh();
  }, [refresh]);

  const value = useMemo<WorkspaceValue>(() => ({
    state, loading, saving, error, config, backend, email, authBusy, authMessage,
    refresh,
    mutate,
    clearError: () => setError(null),
    signIn,
    signOut,
  }), [state, loading, saving, error, config, backend, email, authBusy, authMessage, refresh, mutate, signIn, signOut]);

  if (loading && !loaded) return <LoadingState />;
  if (!loaded && error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-6">
        <ErrorState message={error} onRetry={() => void refresh()} />
      </main>
    );
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {error && (
        <div className="mx-auto max-w-[1500px] px-4 pt-4 lg:px-8">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      )}
      {saving && <span className="sr-only" role="status" aria-live="polite">Saving your progress</span>}
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace(): WorkspaceValue {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
