import { geminiStream } from "@/lib/gemini";
import { retrieveKnowledge } from "@/lib/portfolio-knowledge";

const encoder = new TextEncoder();
const portfolioHints = [
  "sahil","experience","project","java","spring","python","fastapi","kafka","aws","terraform","frontend","backend","ai","llm","rag","prsense","caspian","neopart","skill","strength","weakness","gap","resume","work","build","production","scale","concurrency","docker","kubernetes","api","supportsync","verispec","flowdoctor","lenny","security","sql","open source","deployment","role","fit","collectflow","agentkit"
];

function line(value: unknown) { return encoder.encode(`${JSON.stringify(value)}\n`); }

export async function POST(req: Request) {
  try {
    const { question, contextHint, history = [] } = await req.json();
    if (!question || typeof question !== "string") return Response.json({ error: "Ask a question about Sahil's portfolio." }, { status: 400 });

    const q = `${question} ${contextHint || ""}`.toLowerCase();
    const likelyRelevant = portfolioHints.some((term) => q.includes(term));
    if (!likelyRelevant) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(line({ type: "meta", status: "OUT_OF_SCOPE", sources: [] }));
          controller.enqueue(line({ type: "delta", text: "I’m designed to answer questions about Sahil’s experience, projects, skills and engineering work. I don’t have portfolio evidence for that question." }));
          controller.enqueue(line({ type: "done" }));
          controller.close();
        },
      });
      return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache" } });
    }

    const query = contextHint ? `${question}\nCurrent workspace context: ${contextHint}` : question;
    const chunks = retrieveKnowledge(query, 8);
    const context = chunks.map((c, i) => `[SOURCE ${i + 1}: ${c.title}]\n${c.text}`).join("\n\n");
    const sources = chunks.map((c) => ({ id: c.id, title: c.title, href: c.href }));

    const system = `You are Ask Sahil, a helpful assistant inside Sahil Shitole's portfolio.
STRICT RULES:
- Answer only from PORTFOLIO INFORMATION provided in the user message. Do not use outside knowledge.
- Never invent employers, scale, technologies, metrics, maturity, experience, production usage, or motives.
- If evidence is missing, say: "I couldn’t find anything in the portfolio that confirms ..." Do not equate missing evidence with inability.
- Keep professional work, engineering projects, MVPs and open-source contributions distinct.
- Be concise, natural and useful to a recruiter or engineer.
- If the question asks for a comparison, strength or weakness, reason only from the supplied evidence and qualify project-only evidence.
- You are not a general-purpose chatbot.`;

    const recentHistory = Array.isArray(history) ? history.slice(-16) : [];
    const conversation = recentHistory
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string")
      .map((m: any) => ({ role: m.role === "assistant" ? "model" as const : "user" as const, text: m.text }));
    conversation.push({ role: "user", text: `PORTFOLIO INFORMATION:\n${context}\n\nQUESTION:\n${question}${contextHint ? `\n\nCURRENT VIEW:\n${contextHint}` : ""}` });

    const iterator = geminiStream(conversation, system, 0.12);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(line({ type: "meta", status: "SUPPORTED", sources }));
          for await (const text of iterator) controller.enqueue(line({ type: "delta", text }));
          controller.enqueue(line({ type: "done" }));
        } catch (error) {
          console.error("Ask Sahil stream error", error);
          controller.enqueue(line({ type: "error", message: "Ask Sahil is temporarily unavailable. The rest of the portfolio still works." }));
        } finally { controller.close(); }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" } });
  } catch (error) {
    console.error("Ask Sahil error", error);
    return Response.json({ error: "Ask Sahil is temporarily unavailable." }, { status: 503 });
  }
}
