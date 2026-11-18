export type TutorLanguage = "hindi" | "hinglish" | "english";

export interface TutorMessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface AIProviderStatus {
  configured: boolean;
  providerName: string | null;
  modelName: string | null;
  supportedEnvVars: string[];
}

interface ResolvedProvider {
  kind: "openai" | "gemini" | "groq" | "anthropic" | "custom";
  providerName: string;
  apiKey: string;
  model: string;
  baseUrl?: string;
}

function resolveProvider(): ResolvedProvider | null {
  if (process.env.OPENAI_API_KEY?.trim()) {
    return {
      kind: "openai",
      providerName: "OpenAI",
      apiKey: process.env.OPENAI_API_KEY.trim(),
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    };
  }
  if (process.env.GEMINI_API_KEY?.trim()) {
    return {
      kind: "gemini",
      providerName: "Google Gemini",
      apiKey: process.env.GEMINI_API_KEY.trim(),
      model: process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash",
    };
  }
  if (process.env.GROQ_API_KEY?.trim()) {
    return {
      kind: "groq",
      providerName: "Groq",
      apiKey: process.env.GROQ_API_KEY.trim(),
      model: process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile",
    };
  }
  if (process.env.ANTHROPIC_API_KEY?.trim()) {
    return {
      kind: "anthropic",
      providerName: "Anthropic Claude",
      apiKey: process.env.ANTHROPIC_API_KEY.trim(),
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-latest",
    };
  }
  if (process.env.AI_API_KEY?.trim() && process.env.AI_BASE_URL?.trim()) {
    return {
      kind: "custom",
      providerName: "Custom OpenAI-Compatible Provider",
      apiKey: process.env.AI_API_KEY.trim(),
      baseUrl: process.env.AI_BASE_URL.trim(),
      model: process.env.AI_MODEL?.trim() || "gpt-4o-mini",
    };
  }
  return null;
}

export function getAIProviderStatus(): AIProviderStatus {
  const provider = resolveProvider();
  return {
    configured: Boolean(provider),
    providerName: provider?.providerName ?? null,
    modelName: provider?.model ?? null,
    supportedEnvVars: [
      "OPENAI_API_KEY",
      "GEMINI_API_KEY",
      "GROQ_API_KEY",
      "ANTHROPIC_API_KEY",
      "AI_API_KEY + AI_BASE_URL",
    ],
  };
}

export function buildMinusTutorSystemPrompt(params: {
  subjectName: string;
  language: TutorLanguage;
  chapterContext?: string;
}): string {
  const { subjectName, language, chapterContext } = params;

  const languageInstruction =
    language === "hindi"
      ? "Respond in clear, natural, simple Hindi (Devanagari script). Keep technical NCERT/HPBOSE terms easy to grasp (you may write key terms like 'Ohm's Law' or 'Photosynthesis' in brackets alongside Hindi)."
      : language === "hinglish"
        ? "Respond in warm, natural Hinglish (everyday Hindi written in Roman script mixed smoothly with Class 10 English textbook terms, just like a friendly Himachal/North Indian school teacher)."
        : "Respond in simple, clear, encouraging Indian school English suitable for Class 10 students.";

  return [
    "You are Minus AI Tutor, a friendly, patient, encouraging school teacher for Class 10 HPBOSE (Himachal Pradesh Board of School Education) and NCERT students.",
    "Personality rules:",
    "- Always be warm, respectful, and encouraging. NEVER shame, mock, or scold a student for wrong answers or basic doubts.",
    "- If a student makes a mistake, first praise their effort or identify what they got right, then gently explain where the step went off track and show the right way.",
    "- Keep explanations structured, clear, and concise so they also sound natural when read aloud by text-to-speech.",
    "- For Mathematics and Physics numericals: always show Given, Formula, Step-by-Step substitution, and Final Answer with units.",
    "- For Science diagrams: explain the diagram clearly part-by-part with a simple labelled text layout and key functions.",
    "- When asked for practice questions: give 3 well-graded Class 10 board-style questions and invite the student to reply with their answers so you can check them.",
    "- Do NOT invent HPBOSE syllabus claims—if a chapter might vary in the yearly rationalised circular, gently remind the student to verify on hpbose.org.",
    `Active Subject: ${subjectName}.`,
    chapterContext ? `Current Chapter Context: ${chapterContext}.` : "",
    `Language instruction: ${languageInstruction}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function generateTutorReply(params: {
  subjectName: string;
  language: TutorLanguage;
  chapterContext?: string;
  history: TutorMessageInput[];
}): Promise<
  | { ok: true; reply: string; providerName: string; modelName: string }
  | { ok: false; code: "AI_KEY_MISSING" | "AI_PROVIDER_ERROR"; message: string }
> {
  const provider = resolveProvider();
  if (!provider) {
    return {
      ok: false,
      code: "AI_KEY_MISSING",
      message:
        "No server-side AI API key is configured yet. Add OPENAI_API_KEY, GEMINI_API_KEY, GROQ_API_KEY, or ANTHROPIC_API_KEY to your server environment (.env) and restart the server.",
    };
  }

  const systemPrompt = buildMinusTutorSystemPrompt({
    subjectName: params.subjectName,
    language: params.language,
    chapterContext: params.chapterContext,
  });

  // Trim history to recent 14 turns for fast low-latency responses
  const trimmedHistory = params.history.slice(-14);

  try {
    if (
      provider.kind === "openai" ||
      provider.kind === "groq" ||
      provider.kind === "custom"
    ) {
      const endpoint =
        provider.kind === "openai"
          ? "https://api.openai.com/v1/chat/completions"
          : provider.kind === "groq"
            ? "https://api.groq.com/openai/v1/chat/completions"
            : `${provider.baseUrl?.replace(/\/$/, "")}/chat/completions`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.apiKey}`,
        },
        body: JSON.stringify({
          model: provider.model,
          temperature: 0.5,
          max_tokens: 900,
          messages: [
            { role: "system", content: systemPrompt },
            ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        let parsedMsg = "";
        try {
          const errJson = JSON.parse(errText) as { error?: { message?: string } };
          parsedMsg = errJson?.error?.message ?? "";
        } catch {
          parsedMsg = errText.slice(0, 180);
        }

        if (res.status === 429) {
          return {
            ok: false,
            code: "AI_PROVIDER_ERROR",
            message: `${provider.providerName} API key is connected, but your account has reached its quota or has no remaining API credits (${parsedMsg || "HTTP 429"}). Add billing credits on your provider dashboard or configure another provider key in .env.`,
          };
        }
        if (res.status === 401) {
          return {
            ok: false,
            code: "AI_PROVIDER_ERROR",
            message: `${provider.providerName} rejected the API key (HTTP 401). Please verify your server .env key is active and valid.`,
          };
        }
        return {
          ok: false,
          code: "AI_PROVIDER_ERROR",
          message: `${provider.providerName} returned HTTP ${res.status}. ${parsedMsg || "Please try again shortly."}`,
        };
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return {
          ok: false,
          code: "AI_PROVIDER_ERROR",
          message: `${provider.providerName} returned an empty response.`,
        };
      }

      return {
        ok: true,
        reply,
        providerName: provider.providerName,
        modelName: provider.model,
      };
    }

    if (provider.kind === "gemini") {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        provider.model
      )}:generateContent?key=${encodeURIComponent(provider.apiKey)}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: trimmedHistory.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 900,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        return {
          ok: false,
          code: "AI_PROVIDER_ERROR",
          message: `Google Gemini returned HTTP ${res.status}. ${errText.slice(0, 180)}`,
        };
      }

      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const reply = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim();

      if (!reply) {
        return {
          ok: false,
          code: "AI_PROVIDER_ERROR",
          message: "Google Gemini returned an empty response.",
        };
      }

      return {
        ok: true,
        reply,
        providerName: provider.providerName,
        modelName: provider.model,
      };
    }

    // Anthropic Messages API
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": provider.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: provider.model,
        max_tokens: 900,
        system: systemPrompt,
        messages: trimmedHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        ok: false,
        code: "AI_PROVIDER_ERROR",
        message: `Anthropic returned HTTP ${res.status}. ${errText.slice(0, 180)}`,
      };
    }

    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply = data.content
      ?.filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
      .join("\n")
      .trim();

    if (!reply) {
      return {
        ok: false,
        code: "AI_PROVIDER_ERROR",
        message: "Anthropic returned an empty response.",
      };
    }

    return {
      ok: true,
      reply,
      providerName: provider.providerName,
      modelName: provider.model,
    };
  } catch (err) {
    return {
      ok: false,
      code: "AI_PROVIDER_ERROR",
      message:
        err instanceof Error
          ? `Network error contacting AI provider: ${err.message}`
          : "Unexpected error contacting AI provider.",
    };
  }
}
