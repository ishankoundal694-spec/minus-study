# Minus AI Tutor — integration guide

## 1. Configure a provider

Minus Study uses a secure Next.js route at `POST /api/ai/chat`. It never calls an AI provider from browser code.

```env
AI_API_KEY=server-only-key
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1
AI_STREAMING=true
```

`OPENAI_API_KEY` is accepted as a fallback to `AI_API_KEY`. Any provider exposing an OpenAI-compatible `POST {AI_BASE_URL}/chat/completions` endpoint can be used; set `AI_BASE_URL` and a valid `AI_MODEL` for that provider. If a provider does not support Server-Sent Events, set `AI_STREAMING=false` and the backend will use the non-streaming JSON response.

Never prefix an AI key with `NEXT_PUBLIC_`. Do not place a service-role key or provider secret in client components. Store it in `.env.local` or the host's secret manager. If a key has appeared in a chat message, support ticket or log, revoke and rotate it before using it.

## 2. What the server sends

The backend builds a system prompt for a friendly, patient, encouraging Class 10 tutor. It includes:

- the chosen language: English, Hinglish (Roman script) or Hindi (Devanagari);
- the chosen teaching mode: explain, maths steps, science diagram, practice questions, check answer or general;
- selected subject and chapter context from Minus Study's original curriculum dataset;
- an explicit warning not to claim that an NCERT chapter is automatically in the HPBOSE exam scope;
- a no-shame correction policy and a request for concise, original explanations.

Only the last 12 text messages are forwarded. Message content is length-limited. The provider key is sent only in the server-to-provider `Authorization` header.

## 3. Streaming contract

With `AI_STREAMING=true`, the backend transforms provider SSE chunks into a small normalized stream:

```text
data: {"delta":"First part of the answer"}

data: {"delta":" continued"}

data: [DONE]
```

Errors are returned as JSON with clear codes such as `AI_NOT_CONFIGURED`, `AI_PROVIDER_UNREACHABLE`, `AI_PROVIDER_ERROR` or `AI_EMPTY_RESPONSE`. The client shows the error and never substitutes a canned answer. `GET /api/ai/status` exposes only configuration state and setup instructions, never key material.

## 4. Voice layer

Initial voice support is entirely browser-based:

- `SpeechRecognition` / `webkitSpeechRecognition` converts speech into a transcript.
- `SpeechSynthesisUtterance` reads the AI text answer aloud.
- Continuous conversational mode stops recognition while the request and spoken answer are in progress, then restarts listening.
- Start/stop listening, stop speaking, replay answer and text-only chat controls are explicit.
- `navigator.mediaDevices.getUserMedia({ audio: true })` is used as a permission probe only; its tracks are stopped immediately. No audio is recorded, uploaded or persisted.
- Only recognised text may be saved, controlled by `saveChatHistory`.

HTTPS or localhost and a browser with Web Speech support (commonly Chrome/Edge) are required. If either feature is missing, the UI shows a clear browser-support message and text chat continues to work.

## 5. Upgrading to a low-latency conversational voice API

The UI already separates voice state from transport. To add a genuine realtime voice model later:

1. Add a server route that mints a short-lived session token from a server-only key.
2. Replace `startListening`/`speakAnswer` with a WebRTC or WebSocket audio adapter while keeping the same start/stop, conversation-history and language/mode state.
3. Keep transcript persistence opt-in and avoid storing raw audio by default.
4. Reuse `/api/ai/chat` as the text fallback for unsupported browsers and as the source of answer transcripts.

No frontend API key is required in either architecture.

## 6. Missing-key behaviour

If `AI_API_KEY` / `OPENAI_API_KEY` or `AI_MODEL` is missing, `/api/ai/status` and the tutor UI show exact setup steps. Chat and voice send controls are disabled. No fabricated tutor message appears. A present but unusable key (for example HTTP 429 due to exhausted credits) produces a visible `AI_PROVIDER_ERROR`; add credits or replace the key.
