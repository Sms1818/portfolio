# Sahil Shitole — Portfolio

A recruiter-friendly software-engineering portfolio with three depths:

1. **30 seconds** — immediate positioning and proof.
2. **2 minutes** — guided professional/project story.
3. **Explore** — an OS-inspired engineering workspace with folders, files, apps, evidence, architecture and open-source work.

## Stack

- Next.js 15
- React 19
- TypeScript
- CSS design system + View Transition API
- Gemini API for Ask Sahil and Match Role
- `pdf-parse` + `mammoth` for JD document extraction

## AI architecture

### Ask Sahil

Question → local portfolio retrieval → selected evidence chunks → Gemini streaming response → evidence links.

The assistant is portfolio-scoped. If evidence is not available, it must say the portfolio does not establish the claim.

### Match Role

Paste JD or upload PDF/DOCX/TXT → extract text → retrieve relevant portfolio evidence → Gemini qualitative comparison → stream direct evidence / partial evidence / explicit gaps / recommended evidence to inspect.

No fabricated numerical match score.

## Environment

Create `.env.local`:

```env
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-2.5-flash
```

The API key is server-only. Never use `NEXT_PUBLIC_GEMINI_API_KEY`.

## Run

```bash
npm install
npm run dev
```

## Product truth rules

- Professional work, engineering projects, MVPs and open-source contributions stay distinct.
- VeriSpec, FlowDoctor and Lenny remain MVPs.
- PRSense limitations stay visible rather than being rewritten as fictional production hardening.
- Ask Sahil and Match Role only reason over portfolio evidence.
- Core portfolio remains useful if Gemini is unavailable.
