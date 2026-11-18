# KB 5 — Reading rules (how to read a hospital paper)

Given to the AI inside the extraction prompt (`EXTRACT_PROMPT` in `src/logic.js`). The AI must follow them for every page.

## Dose abbreviations → morning-afternoon-night pattern

| On the paper | Means | Pattern |
| --- | --- | --- |
| OD | once a day | 1-0-0 |
| BD | twice a day | 1-0-1 |
| TDS | three times a day | 1-1-1 |
| HS / bedtime | at night | 0-0-1 |
| 1-0-1 | morning and night | 1-0-1 |
| SOS / as needed | only when needed | sos = true |
| x 5 days | course length | duration_days = 5 |
| long term / continue (no end) | keep going | long_term = true |
| x 5 days, then SOS | course, then as needed | duration 5, then_sos = true |
| Stop X | stop instruction | action = stop |
| Continue X | carry on as before | action = continue |

## Dates (counted from the paper's own date)

| On the paper | due_in_days | interval |
| --- | --- | --- |
| after 7 days | 7 | — |
| after 4 weeks | 28 | — |
| in 1 month | 30 | — |
| after 8 weeks | 56 | — |
| after 12 weeks | 84 | — |
| every 6 months | — | 6 months, restarts from the latest result |

## Document types

discharge_summary · histopathology · rt_summary · prescription · lab_report · imaging · bill · other

## Extraction schema (every item carries a verbatim quote)

doc_type, doc_date, department, condition, patient{name, age_sex, reg_no, allergies}, diagnosis[], treatment[], medicines[{name, salt, strength, form, dose_pattern, timing, duration_days, long_term, sos, then_sos, action, quote}], visits[{department, due_in_days, quote}], tests[{name, due_in_days, interval_months, prep, quote}], results[{test, value, flag, quote}], diet[], precautions[], exercises[{freq_per_day}], warning_signs[], bills[{bill_no, what, amount, payer, claim_status, quote}], contacts[], summary_en, summary_hi

## Hard rules

1. Copy every quote word for word from the page.
2. Never invent a medicine, dose, date, test or symptom; use null.
3. Temperature 0, JSON only.
4. Condition: head_neck_cancer (mouth, tongue, throat, larynx cancer), heart_attack (heart attack, angioplasty), otherwise general.
