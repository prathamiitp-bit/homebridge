# HomeBridge knowledge bases

The AI reads; these files tell it what is true, how to read, and what matters more.

| Layer | File | Used for |
| --- | --- | --- |
| Facts | 01_patient_papers_index.json | RAG: the family's papers, chunked and indexed (BM25 + synonyms + recency) |
| Facts | 02_medicine_catalogue.csv | Cheapest same-salt option: 1mg online, Jan Aushadhi, local chemist |
| Facts | 03_brand_to_salt.csv | Matching brands across papers by salt |
| Facts | 04_medicine_guide.csv | Plain-language purpose and look ("peeli lambi goli") |
| Reading | 05_reading_rules.md | Dose abbreviations, dates, document types, output schema |
| Reading | 07_synonyms.csv | English + Hindi word groups for search |
| Deciding | 06_condition_checklists.json | What a condition's papers should contain; gaps become questions |
| Deciding | 08_decision_rules_and_weights.md | Priority order, status rules, weights and thresholds |

All patient data here is synthetic. Code that uses these: `src/logic.js`.
