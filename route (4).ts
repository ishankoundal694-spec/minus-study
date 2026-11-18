import { type NextRequest, NextResponse } from "next/server";
import { getChapter, getSubject } from "@/lib/curriculum";
import { publicConfig } from "@/lib/workspace";
import type { TutorLanguage } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Mode = "general" | "explain" | "steps" | "practice" | "check" | "diagram";
type IncomingMessage = { role: "user" | "assistant"; content: string };

const languages: TutorLanguage[] = ["english", "hinglish", "hindi"];
const modes: Mode[] = ["general", "explain", "steps", "practice", "check", "diagram"];
const defaultBaseUrl = "https://api.openai.com/v1";

function text(value: unknown, max = 4000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function languageInstruction(language: TutorLanguage): string {
  if (language === "hindi") return "Reply in warm, simple Hindi written in Devanagari. Explain technical English terms briefly in Hindi.";
  if (language === "hinglish") return "Reply in natural, friendly Hinglish using Roman script. Keep school terminology accurate and easy to read.";
  return "Reply in clear, friendly English suitable for a Class 10 student.";
}

function modeInstruction(mode: Mode): string {
  switch (mode) {
    case "steps": return "Solve the maths problem with numbered steps. Show the reason for each step and end with a quick self-check.";
    case "practice": return "Generate 3 original practice questions of increasing difficulty. Do not give all answers immediately; offer to check the student's attempts.";
    case "check": return "Check the student's answer kindly. Identify the exact misconception, explain the correction, and give one similar but different practice question.";
    case "diagram": return "Explain the science concept and diagram in words. Describe labels and arrows clearly; use a compact ASCII diagram only when it genuinely helps.";
    case "explain": return "Explain the concept in simple language, then give one everyday example and one exam-style application.";
    default: return "Answer the question directly, kindly and concisely. Use short paragraphs or numbered steps when helpful.";
  }
}

function aiSetupError(model: string | undefined, baseUrl: string) {
  const missing: string[] = [];
  if (!process.env.AI_API_KEY && !process.env.OPENAI_API_KEY) missing.push("AI_API_KEY (or OPENAI_API_KEY)");
  if (!model) missing.push("AI_MODEL");
  return NextResponse.json({
    error: "AI_NOT_CONFIGURED",
    message: "No AI API key is configured. Minus Study never generates fake AI answers.",
    setup: {
      steps: [
        "Set AI_API_KEY to a server-only key from an OpenAI-compatible provider.",
        "Set AI_MODEL to a model available to that key.",
        "Optionally set AI_BASE_URL for another compatible provider.",
        "Restart the server; never expose the key with a NEXT_PUBLIC_ prefix.",
      ],
      example: "AI_API_KEY=server-only-key\nAI_MODEL=gpt-4o-mini\nAI_BASE_URL=https://api.openai.com/v1",
      currentBaseUrl: baseUrl,
      missing,
    },
  }, { status: 503, headers: { "Cache-Control": "no-store" } });
}

function buildMessages(body: Record<string, unknown>, language: TutorLanguage, mode: Mode) {
  const subjectId = text(body.subjectId, 80) || "general";
  const chapterId = text(body.chapterId, 120);
  const subject = getSubject(subjectId);
  const chapter = getChapter(chapterId);
  const scope = chapter && chapter.subjectId === subjectId ? chapter : undefined;
  const contextParts = [
    `Selected subject: ${subject?.name ?? "General Class 10"}.`,
    subject ? `Curriculum note: ${subject.curriculumNote}` : "",
    scope ? `Chapter context (original study guide): ${scope.title}. Summary: ${scope.summary}. Topics: ${scope.topics.join(", ")}. Scope note: ${scope.scopeNote}` : "No specific chapter selected.",
    "Do not claim that an NCERT chapter is automatically part of the HPBOSE exam. If scope is uncertain, direct the student to the official HPBOSE notice or their teacher.",
  ].filter(Boolean).join("\n");

  const system = [
    "You are Minus AI Tutor, a friendly, patient and encouraging school tutor for Class 10 HPBOSE students.",
    "Never shame a student for an incorrect answer. Begin corrections with genuine encouragement and focus on the next small step.",
    "Use simple language, short sections and concrete examples. For maths, work step by step. For science, describe diagrams and label relationships clearly.",
    "Create original practice questions and explain mistakes constructively. Do not reproduce copyrighted textbook passages.",
    "If a question is outside the provided curriculum context, say what you can answer safely and suggest checking the official syllabus.",
    "Keep answers focused (normally under 350 words) and finish with one supportive follow-up question or offer to practise.",
    languageInstruction(language),
    modeInstruction(mode),
    contextParts,
  ].join("\n\n");

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const history: { role: "user" | "assistant"; content: string }[] = rawMessages
    .filter(isObject)
    .slice(-12)
    .map((message) => ({
      role: message.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: text(message.content, 3000),
    }))
    .filter((message) => message.content.length > 0);

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return null;
  }
  return [{ role: "system" as const, content: system }, ...history];
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 80_000) return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    body = parsed;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = (process.env.AI_BASE_URL || defaultBaseUrl).replace(/\/+$/, "");
  const model = process.env.AI_MODEL || (baseUrl === defaultBaseUrl ? "gpt-4o-mini" : undefined);
  if (!key || !model) return aiSetupError(model, baseUrl);

  const language = languages.includes(body.language as TutorLanguage) ? body.language as TutorLanguage : "english";
  const mode = modes.includes(body.mode as Mode) ? body.mode as Mode : "general";
  const messages = buildMessages(body, language, mode);
  if (!messages) return NextResponse.json({ error: "A user message is required" }, { status: 400 });

  const wantsStream = body.stream !== false && publicConfig().aiStreaming;
  const payload = {
    model,
    messages,
    temperature: 0.45,
    max_tokens: 900,
    stream: wantsStream,
  };

  let upstream: Response;
  try {
    upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
      signal: request.signal,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "AI_PROVIDER_UNREACHABLE", message: "Could not reach the AI provider. Check the server network and AI_BASE_URL." }, { status: 502 });
  }

  if (!upstream.ok) {
    let detail = "";
    try {
      const errorBody = await upstream.json() as { error?: { message?: string } };
      if (typeof errorBody?.error?.message === "string") detail = errorBody.error.message.slice(0, 240);
    } catch {
      // Keep the safe, actionable message below if the provider response is not JSON.
    }
    let message = `The AI provider returned HTTP ${upstream.status}.`;
    if (upstream.status === 401 || upstream.status === 403) {
      message = "The AI provider rejected the API key (401/403). Check that the key is active, belongs to the selected provider, and is stored in the server environment as AI_API_KEY.";
    } else if (upstream.status === 429) {
      message = "The AI provider rate limit or credit quota was reached (429). Wait and retry, or check the provider dashboard for available credits and usage limits.";
    } else if (upstream.status === 404) {
      message = "The AI model or API endpoint was not found (404). Check AI_MODEL and AI_BASE_URL; the model must be available to this key.";
    }
    if (detail && upstream.status !== 401 && upstream.status !== 403) message += ` Provider detail: ${detail}`;
    return NextResponse.json({ error: "AI_PROVIDER_ERROR", providerStatus: upstream.status, message }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  if (!wantsStream) {
    try {
      const result = await upstream.json() as { choices?: { message?: { content?: string } }[] };
      const content = result.choices?.[0]?.message?.content?.trim();
      if (!content) return NextResponse.json({ error: "AI_EMPTY_RESPONSE", message: "The provider returned no text. Try again." }, { status: 502 });
      return NextResponse.json({ content, streamed: false }, { headers: { "Cache-Control": "no-store" } });
    } catch {
      return NextResponse.json({ error: "AI_PARSE_ERROR", message: "Could not read the provider response." }, { status: 502 });
    }
  }

  const reader = upstream.body?.getReader();
  if (!reader) return NextResponse.json({ error: "AI_STREAM_UNAVAILABLE", message: "The provider did not return a stream." }, { status: 502 });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      let done = false;
      try {
        while (!done) {
          const part = await reader.read();
          if (part.done) break;
          buffer += decoder.decode(part.value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") { done = true; break; }
            try {
              const parsed = JSON.parse(data) as { choices?: { delta?: { content?: string } }[] };
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
            } catch {
              // Ignore provider keep-alive/comment frames.
            }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch {
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "The AI stream was interrupted. Please try again." })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
