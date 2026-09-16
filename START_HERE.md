# Start here

1. Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-2.5-flash
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open http://localhost:3000

## Key routes

- `/` — 30-second recruiter view + Ask Sahil + Match Role entry points
- `/story` — guided 2-minute story
- `/boot?next=/workspace` — transition into the engineering workspace
- `/workspace` — OS-style deep exploration

Ask Sahil uses retrieval over the structured portfolio knowledge base, then Gemini streams a grounded answer. Match Role accepts pasted text or PDF/DOCX/TXT and uses the same evidence layer for a qualitative, gap-explicit comparison. Neither feature is allowed to invent unsupported portfolio facts.
