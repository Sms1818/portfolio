const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

type GeminiRole = "user" | "model";
type GeminiMessage = { role: GeminiRole; text: string };

function getKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  return key;
}

function toContents(messages: GeminiMessage[]) {
  return messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
}

export async function geminiGenerate(messages: GeminiMessage[], systemInstruction: string, temperature = 0.15) {
  const key = getKey();
  const model = DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: toContents(messages),
      generationConfig: { temperature, maxOutputTokens: 8192 },
    }),
    cache: "no-store",
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`Gemini request failed (${response.status}): ${raw.slice(0, 500)}`);
  const data = JSON.parse(raw);
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
  if (!text.trim()) throw new Error("Gemini returned an empty response");
  return text.trim();
}

/**
 * Streams Gemini text as an async generator. The Google endpoint returns SSE where each
 * `data:` payload is a GenerateContentResponse JSON object.
 */
export async function* geminiStream(messages: GeminiMessage[], systemInstruction: string, temperature = 0.15) {
  const key = getKey();
  const model = DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: toContents(messages),
      generationConfig: { temperature, maxOutputTokens: 8192 },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini stream failed (${response.status}): ${body.slice(0, 500)}`);
  }
  if (!response.body) throw new Error("Gemini returned no stream body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let emitted = false;

  function extractText(payload: string) {
    if (!payload || payload === "[DONE]") return "";
    const json = JSON.parse(payload);
    return (
      json?.candidates?.[0]?.content?.parts
        ?.filter((part: { thought?: boolean }) => !part?.thought)
        ?.map((part: { text?: string }) => part.text || "")
        ?.join("") || ""
    );
  }

  function parseEvents(input: string) {
    // Google may use CRLF in SSE responses. Normalize it before splitting events.
    const normalized = input.replace(/\r\n/g, "\n");
    const events = normalized.split("\n\n");
    return { complete: events.slice(0, -1), rest: events.at(-1) || "" };
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const { complete, rest } = parseEvents(buffer);
    buffer = rest;

    for (const event of complete) {
      const payloadLines = event
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim());

      if (!payloadLines.length) continue;

      try {
        const chunk = extractText(payloadLines.join("\n"));
        if (chunk) {
          emitted = true;
          yield chunk;
        }
      } catch (error) {
        console.warn("Unable to parse a Gemini SSE event", error);
      }
    }
  }

  // Flush any final SSE event that did not end with a blank line.
  const finalBuffer = (buffer + decoder.decode()).replace(/\r\n/g, "\n").trim();
  if (finalBuffer) {
    const payloadLines = finalBuffer
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim());
    if (payloadLines.length) {
      try {
        const chunk = extractText(payloadLines.join("\n"));
        if (chunk) {
          emitted = true;
          yield chunk;
        }
      } catch (error) {
        console.warn("Unable to parse the final Gemini SSE event", error);
      }
    }
  }

  // Some proxies / runtimes buffer or reshape SSE unexpectedly. If we received a
  // successful stream response but no text, fall back to the non-streaming endpoint
  // instead of showing an empty answer to the visitor.
  if (!emitted) {
    console.warn("Gemini stream produced no text; falling back to generateContent");
    const fallback = await geminiGenerate(messages, systemInstruction, temperature);
    if (fallback) yield fallback;
  }
}

