import { NextResponse } from "next/server";
import { publicConfig } from "@/lib/workspace";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = publicConfig();
  return NextResponse.json({
    ...config,
    setup: {
      title: config.aiConfigured ? "AI key is configured" : "AI Tutor needs a server-side API key",
      message: config.aiConfigured
        ? "A server-side AI key is available. Real chat responses come from the configured model; no key is exposed to the browser. Provider credit, quota or network errors are shown clearly and never replaced with invented answers."
        : "No AI API key is configured. Minus Study will not invent answers. Add a key to the server environment and restart the app.",
      steps: [
        "Copy .env.example to .env (or set the variables in your hosting provider).",
        "Set AI_API_KEY to a server-only key from your OpenAI-compatible provider.",
        "Set AI_MODEL to a model your key can access, for example gpt-4o-mini.",
        "Optionally set AI_BASE_URL for a compatible provider and AI_STREAMING=false to disable streaming.",
        "Restart the server. Keys must never use a NEXT_PUBLIC_ prefix.",
      ],
      voiceNote: "Microphone transcripts are generated in the browser. Only text messages may be saved, never raw audio recordings.",
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
