const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export function groqConfig() {
  return {
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  };
}

export function groqAvailable() {
  return Boolean(process.env.GROQ_API_KEY);
}

export async function groqChat(messages: Array<{ role: "system" | "user" | "assistant"; content: string }>) {
  const { apiKey, model } = groqConfig();
  if (!apiKey) {
    throw new Error("GROQ_UNAVAILABLE");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GROQ_HTTP_${response.status}: ${text.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("GROQ_EMPTY");
  return content;
}

export function parseJsonObject<T>(raw: string): T {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced?.[1] ?? trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("GROQ_JSON");
  return JSON.parse(candidate.slice(start, end + 1)) as T;
}
