# KB 8 — Decision rules, priority order and weights

Run as code after the AI has read the papers (`buildPlan`, `buildCart`, `search`, `answerOffline` in `src/logic.js`).

## 1. Source authority (who wins when sources disagree)

| Rank | Source | Add a medicine | Stop a medicine | Set a date | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Safety rules | — | — | — | Override everything below |
| 2 | Newest dated hospital paper, with a verified quote | Yes | Yes | Yes | Matched by salt, not brand |
| 3 | Older hospital paper | Yes, unless a newer paper changes it | Yes, unless restarted later | Yes, unless replaced | |
| 4 | AI reading with no verified quote | Flagged | Never | Flagged | Goes to "Ask doctor" |
| 5 | Medicine box at home | Never | Never | Never | Only reduces quantity to buy |
| 6 | Condition checklist | Never | Never | Never | Only creates questions |

## 2. Medicine status rules (checked in this order)

| # | If | Status |
| --- | --- | --- |
| 1 | Latest mention says stop | STOPPED |
| 2 | Marked SOS / as needed | ACTIVE (only when needed) |
| 3 | Marked long term | ACTIVE |
| 4 | Has a duration and it has run out | COMPLETE (or SOS if "then SOS") |
| 5 | Has a duration still running | ACTIVE, with days left |
| 6 | No duration on the paper | ACTIVE + flag "duration not specified" |
| 7 | First appears on the newest prescription | NEW |
| 8 | Same salt, different strength or dose than before | CHANGED |
| 9 | In the box at home but on no paper | ASK_DOCTOR |

Display order: NEW, CHANGED, ACTIVE, ASK_DOCTOR, STOPPED, COMPLETE.

## 3. Answering a question (order of checks)

1. Advice check: stop/skip/change-dose questions are refused and added to visit questions.
2. Plan facts: next scan, next visit, current medicines, bill totals.
3. Retrieval over the vault (weights below), top 5 passages to the AI, answer must cite [D#].
4. If the best passage covers under 60% of the question's words: "Not in your papers".

## 4. Weights and thresholds

| Setting | Value |
| --- | --- |
| Exact word from the question | 1.0 |
| Synonym match | 0.6 |
| Newer page boost | × (1 + 0.25 / (1 + age_days / 30)) |
| BM25 | k1 = 1.4, b = 0.75 |
| Passages sent to the AI | 5 |
| Minimum coverage to answer | 60% of question words |
| Extraction temperature | 0 |
| Cart horizon | 30 days |
| Cart choice | same salt + same strength only, then lowest total across 1mg online, Jan Aushadhi, local chemist |
| Missing duration | 30 days assumed for buying only, flagged for the doctor |
| Thyroid interval | 6 months ≈ 182 days from the latest result |
