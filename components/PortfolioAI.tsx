"use client";

import { DragEvent, FormEvent, useEffect, useRef, useState, type ReactNode } from "react";

type Source = { id: string; title: string; href?: string };

type StreamState = { text: string; sources: Source[]; status?: string; error?: string };

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

function MarkdownContent({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const nodes: ReactNode[] = [];
  let bullets: string[] = [];

  function flushBullets() {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    nodes.push(
      <ul key={`ul-${nodes.length}`}>
        {items.map((item, i) => <li key={i}>{renderInlineMarkdown(item)}</li>)}
      </ul>
    );
  }

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) { flushBullets(); return; }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushBullets();
      const level = heading[1].length;
      const content = renderInlineMarkdown(heading[2]);
      if (level === 1) nodes.push(<h2 key={`h-${index}`}>{content}</h2>);
      else nodes.push(<h3 key={`h-${index}`}>{content}</h3>);
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) { bullets.push(bullet[1]); return; }

    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (numbered) { bullets.push(numbered[1]); return; }

    flushBullets();
    nodes.push(<p key={`p-${index}`}>{renderInlineMarkdown(line)}</p>);
  });

  flushBullets();
  return <div className="renderedMarkdown">{nodes}</div>;
}

async function consumeNDJSON(response: Response, onEvent: (event: any) => void) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Request failed");
  }
  if (!response.body) throw new Error("Streaming response unavailable");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.trim()) continue;
      try { onEvent(JSON.parse(line)); } catch { /* wait for a valid line */ }
    }
  }
}

export function AskSahil({ compact = false, contextHint }: { compact?: boolean; contextHint?: string }) {
  type Message = { role: "user" | "assistant"; text: string };
  type Chat = { id: string; title: string; messages: Message[]; updatedAt: number };
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<StreamState>({ text: "", sources: [] });
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState("");
  const threadEndRef = useRef<HTMLDivElement>(null);
  const samples = ["What kind of work has Sahil done?", "Tell me about PRSense", "What has he built with AI?", "What are his current gaps?"];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sahil-ask-history") || "[]") as Chat[];
      if (saved.length) { setChats(saved); setActiveId(saved[0].id); }
      else newChat();
    } catch { newChat(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chats.length) localStorage.setItem("sahil-ask-history", JSON.stringify(chats.slice(0, 12)));
  }, [chats]);

  const active = chats.find((c) => c.id === activeId);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: loading ? "smooth" : "auto", block: "end" });
  }, [active?.messages.length, state.text, loading, activeId]);

  function newChat() {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    const chat: Chat = { id, title: "New conversation", messages: [], updatedAt: Date.now() };
    setChats((old) => [chat, ...old].slice(0, 12));
    setActiveId(id);
    setState({ text:"", sources:[] });
    setQuestion("");
  }

  function openChat(id:string) {
    setActiveId(id);
    setState({ text:"", sources:[] });
    setQuestion("");
  }

  function deleteChat(id:string) {
    const next = chats.filter((c) => c.id !== id);
    setChats(next);
    if (activeId === id) {
      if (next[0]) { setActiveId(next[0].id); setState({ text:"", sources:[] }); }
      else newChat();
    }
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!question.trim() || loading) return;

    let id = activeId;
    let current = chats.find((c) => c.id === id);
    if (!current) { newChat(); return; }

    const q = question.trim();
    const history = current.messages;
    setQuestion("");
    setLoading(true);
    setState({ text: "", sources: [] });

    setChats((old) => old.map((c) => c.id === id ? {
      ...c,
      title: c.messages.length ? c.title : q.slice(0, 42),
      messages: [...c.messages, { role:"user", text:q }],
      updatedAt: Date.now(),
    } : c));

    let answer = "";
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question:q, contextHint, history }),
      });

      await consumeNDJSON(response, (event) => {
        if (event.type === "meta") setState((st) => ({ ...st, status: event.status, sources: event.sources || [] }));
        if (event.type === "delta") {
          answer += event.text;
          setState((st) => ({ ...st, text: st.text + event.text }));
        }
        if (event.type === "error") setState((st) => ({ ...st, error: event.message }));
      });

      if (answer) {
        setChats((old) => old.map((c) => c.id === id ? {
          ...c,
          messages: [...c.messages, { role:"assistant", text:answer }],
          updatedAt: Date.now(),
        } : c));
        setState({ text:"", sources:[] });
      }
    } catch (error) {
      setState({ text: "", sources: [], error: error instanceof Error ? error.message : "Ask Sahil is temporarily unavailable." });
    } finally {
      setLoading(false);
    }
  }

  const transcript = active?.messages || [];

  return <div className={compact ? "assistantModule askModule compact" : "assistantModule askModule"}>
    <div className="chatHistoryLayout">
      {!compact && <aside className="chatHistory">
        <button className="newChatButton" onClick={newChat}>+ New chat</button>
        <small>RECENT</small>
        {chats.map((chat) => <div className={chat.id===activeId ? "chatHistoryItem active" : "chatHistoryItem"} key={chat.id}>
          <button onClick={() => openChat(chat.id)}>{chat.title}</button>
          <button className="deleteChat" onClick={() => deleteChat(chat.id)} aria-label="Delete chat">×</button>
        </div>)}
      </aside>}

      <div className="chatMain">
        <div className="conversationThread" aria-live="polite">
          {!transcript.length && !loading && !state.error && <div className="aiPlaceholder">
            <span>✦</span><b>Ask me anything about my work</b><p>I’ll answer from what’s in this portfolio.</p>
          </div>}

          {transcript.map((message, index) => <div className={`chatMessage ${message.role}`} key={`${activeId}-${index}`}>
            <div className="chatMessageLabel">{message.role === "user" ? "You" : "Ask Sahil"}</div>
            <div className="chatMessageBody">{message.role === "assistant" ? <MarkdownContent text={message.text}/> : message.text}</div>
          </div>)}

          {loading && <div className="chatMessage assistant streamingMessage">
            <div className="chatMessageLabel">Ask Sahil</div>
            <div className="chatMessageBody">
              {!state.text ? <div className="streamStarting"><span/><span/><span/> Looking through my work…</div> : <><MarkdownContent text={state.text}/><i className="streamCursor"/></>}
            </div>
          </div>}

          {state.error && <div className="aiError">{state.error}</div>}
          <div ref={threadEndRef}/>
        </div>

        <div className="assistantComposer">
          <form onSubmit={submit}>
            <div className="assistantInputIcon">✦</div>
            <textarea rows={compact ? 3 : 4} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about my work, projects, skills, or experience…"/>
            <button className="aiSend" disabled={loading || !question.trim()} aria-label="Ask Sahil">{loading ? <span className="thinkingDots"><i/><i/><i/></span> : "Ask →"}</button>
          </form>
          {!transcript.length && <div className="promptChips">{samples.slice(0, compact ? 2 : 4).map((sample) => <button key={sample} onClick={() => setQuestion(sample)}>{sample}</button>)}</div>}
        </div>
      </div>
    </div>
  </div>;
}
export function MatchRole({ compact = false }: { compact?: boolean }) {
  const [jd, setJd] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<StreamState>({ text: "", sources: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  function acceptFile(candidate?: File | null) {
    if (!candidate) return;
    const ok = /\.(pdf|docx|txt)$/i.test(candidate.name);
    if (!ok) { setState({ text: "", sources: [], error: "Upload a PDF, DOCX or TXT job description." }); return; }
    setFile(candidate); setState({ text: "", sources: [] });
  }
  function drop(e: DragEvent) { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files?.[0]); }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if ((!jd.trim() && !file) || loading) return;
    setLoading(true); setState({ text: "", sources: [] });
    try {
      const form = new FormData();
      form.append("jobDescription", jd);
      if (file) form.append("file", file);
      const response = await fetch("/api/match", { method: "POST", body: form });
      await consumeNDJSON(response, (event) => {
        if (event.type === "meta") setState((s) => ({ ...s, sources: event.sources || [] }));
        if (event.type === "delta") setState((s) => ({ ...s, text: s.text + event.text }));
        if (event.type === "error") setState((s) => ({ ...s, error: event.message }));
      });
    } catch (error) {
      setState({ text: "", sources: [], error: error instanceof Error ? error.message : "Role analysis is temporarily unavailable." });
    } finally { setLoading(false); }
  }

  return <div className={compact ? "assistantModule compact matchModule" : "assistantModule matchModule"}>
    <div className="assistantComposer">
      <div className={dragging ? "dropZone dragging" : "dropZone"} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => acceptFile(e.target.files?.[0])} hidden />
        <span className="dropIcon">⇧</span>
        {file ? <><b>{file.name}</b><small>{(file.size / 1024).toFixed(0)} KB · click to replace</small></> : <><b>Drop a job description</b><small>PDF, DOCX or TXT · or click to browse</small></>}
      </div>
      <div className="orDivider"><span/>or paste the JD<span/></div>
      <form onSubmit={submit}>
        <textarea rows={compact ? 4 : 7} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste a job description here…" />
        <button className="aiSend" disabled={loading || (!jd.trim() && !file)}>{loading ? <span className="thinkingDots"><i/><i/><i/></span> : "Check role →"}</button>
      </form>
      <p className="analysisTrust">I’ll compare the role with what I’ve actually worked on and point out both matches and gaps.</p>
    </div>
    <div className="assistantResponse matchResponse" aria-live="polite">
      {!state.text && !state.error && !loading && <div className="aiPlaceholder"><span>◎</span><b>See how my experience lines up</b><p>You’ll get the strongest matches, related experience, and anything the role asks for that isn’t shown here.</p></div>}
      {loading && !state.text && <div className="streamStarting"><span/><span/><span/> Reading the job description and comparing it with my work…</div>}
      {state.error && <div className="aiError">{state.error}</div>}
      {state.text && <div className="streamedText markdownLike"><MarkdownContent text={state.text}/><i className={loading ? "streamCursor" : ""}/></div>}
      
    </div>
  </div>;
}
