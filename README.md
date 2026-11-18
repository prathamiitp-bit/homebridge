# HomeBridge — AI post-discharge recovery hub

**Concept prototype for Tata 1mg. Not an official 1mg product. All data is synthetic.**

Families leave hospital with a folder of papers: discharge summaries, reports, prescriptions and bills. HomeBridge reads every paper, keeps one reconciled plan in ten tabs, and helps the family act on it: reminders, refills at the cheapest same-salt price, visit prep, and answers from their own documents.

## Screens (S0–S15)

S0 Landing · S1 Condition and dates · S2 Upload folder · S3 Reading your papers · S4 Checklist and gaps · S5 Dashboard (Today) · S6 Medicines · S7 Visits · S8 Care at home (diet, self-care, warning signs) · S9 Tests, reports and bills · S10 Medicine box and cart · S11 Reminders (.ics) · S12 Ask your documents · S13 Visit prep and care team · S14 Document vault · S15 WhatsApp updates. Plus "How HomeBridge decides" (knowledge bases, rule order, weights). English and Hindi throughout, and a Simple view (bigger text, plain words, pill pictures with what each medicine is for and what it looks like) for older users.

## How the AI works

| Step | Who does it | File |
| --- | --- | --- |
| Read and sort each page (photo or PDF) | Vision LLM | `src/logic.js` → `extractLive`, `EXTRACT_PROMPT` |
| Extract into a fixed JSON schema, every item with a verbatim quote | LLM, temperature 0 | same |
| Brand → salt, "after 12 weeks" → date | Code + catalogue | `normaliseSalt`, `buildPlan` |
| Reconcile across papers (newest paper wins; stop only when written) | Code rules | `buildPlan` |
| Gaps against the condition's checklist | Code + synonyms | `findGaps`, `JOURNEYS` in `src/data.js` |
| Cart: only what is missing, cheapest same salt and strength | Code | `buildCart` |
| Ask your documents (RAG): BM25 keyword + synonym search, then the LLM answers only from retrieved pages | Code + LLM | `buildIndex`, `search`, `askLive` |

The sample folder (8 fictional documents for a tongue-cancer survivor) ships with a saved answer key (`CACHED_EXTRACTIONS`). With live AI on, the app reads the sample afresh and reports how many medicine statuses match the key.

## Where the AI comes from

`src/logic.js → AI.init()` picks the first that works:

1. **Claude inside claude.ai** (when the page is published as a Claude artifact).
2. **`/api/llm`** on your own host (Vercel): set `ANTHROPIC_API_KEY` (Claude) or `GEMINI_API_KEY` (Gemini) as a server environment variable. The key never reaches the browser.
3. **Offline:** the sample works fully from its answer key; uploaded files are kept in the vault but not read.

## Deploy on Vercel (public link)

1. Put this folder in a GitHub repository (github.com → New repository → "uploading an existing file" → drag the folder contents in).
2. vercel.com → Add New → Project → import the repository. Framework preset: **Other**. No build command; output directory is the root.
3. Settings → Environment Variables:
   - `ANTHROPIC_API_KEY` (Claude, recommended) or `GEMINI_API_KEY` (Gemini, free tier) — reads the papers.
   - Optional WhatsApp: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `WA_ALLOWED_TO` (your own number, e.g. `+9198XXXXXXXX`, so strangers cannot use it).
4. Deployments → Redeploy. The app lives at `https://<project>.vercel.app`, the printable papers at `/papers.html`.

## Live demo

See `DEMO_RUNBOOK.md`. Printable sample papers: `sample-papers/` or `/papers.html` on the live link (prints for today's date; add `?today=YYYY-MM-DD` for another day, and open the app with the same `?today=` so dates line up).

## Edit

The page is built from `src/` (no npm, no framework): edit `src/data.js`, `src/logic.js`, `src/ui.js` or `src/styles.css`, then run `python3 build.py` to regenerate `index.html`.

## Safety

Every item links to the page and line it came from. Unclear items go to "Ask doctor". No diagnosis, dose change or treatment advice. Nothing is stored after the session.

## Knowledge bases

The `knowledge/` folder holds the 8 knowledge bases the AI uses (facts, reading rules, decision rules and weights). See `knowledge/README.md`.
