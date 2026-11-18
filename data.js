// ============================================================
// HomeBridge — synthetic demo data (all fictional)
// Dates are generated relative to the day of the demo (T) so the
// dashboard always shows upcoming items. RT ended on T - 21.
// ============================================================

const DAY = 864e5;
function isoDay(d) { return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const T_ISO = isoDay(TODAY);
function addDaysIso(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + Number(n)); return isoDay(d); }
function daysBetween(a, b) { return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / DAY); }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function paperDate(iso) { const [y, m, d] = iso.split('-'); return `${d}-${MONTHS[Number(m) - 1]}-${y}`; }

const RT_END = addDaysIso(T_ISO, -21);
const D = {
  surgeryAdmit: addDaysIso(RT_END, -76),
  surgery: addDaysIso(RT_END, -74),
  d1: addDaysIso(RT_END, -70),
  d2: addDaysIso(RT_END, -62),
  rtStart: addDaysIso(RT_END, -41),
  d3: RT_END,
  d4: addDaysIso(T_ISO, -7),
  d5: addDaysIso(T_ISO, -7),
  d8a: addDaysIso(RT_END, -70),
  d8b: addDaysIso(RT_END, -20),
  d8c: addDaysIso(T_ISO, -7),
};

const HOSPITAL = 'NORTHERN REGIONAL CANCER INSTITUTE (fictional)';

// ---------- The 8 synthetic documents (what the family photographs) ----------
const SAMPLE_DOCS = [
  {
    id: 'D1', type: 'discharge_summary', date: D.d1, title: 'Discharge summary (surgery)', pages: 1,
    text: `${HOSPITAL}
Department of Head & Neck Surgery
DISCHARGE SUMMARY

Patient: Ramesh K. (synthetic)    Age/Sex: 56/M    Reg. No: NRCI-DEMO-2041
Admitted: ${paperDate(D.surgeryAdmit)}    Discharged: ${paperDate(D.d1)}
Consultant: Dr. S. Arora (Head & Neck Surgery, fictional)
Known allergies: None known

Diagnosis: Squamous cell carcinoma, right lateral border of tongue.
Procedure: Right partial glossectomy with right selective neck dissection (levels I-IV) on ${paperDate(D.surgery)}.
Course in hospital: Uneventful recovery. Oral feeds started on day 3.

Medications on discharge:
1. Tab Amoxicillin-Clavulanate 625 mg  1-0-1 after food  x 5 days
2. Tab Paracetamol 650 mg  1-1-1  x 5 days, then SOS for pain
3. Tab Pantoprazole 40 mg  1-0-0 before breakfast  x 14 days
4. Chlorhexidine 0.2% mouthwash 10 ml rinse  1-1-1  x 14 days

Advice: Soft diet. Tongue and jaw movement exercises as taught.
Keep the neck wound clean and dry. No tobacco, alcohol or areca nut.

Follow-up: Head & Neck Surgery OPD after 7 days with histopathology report.
Radiotherapy planning as advised by Radiation Oncology.

Return to emergency if: bleeding from mouth or wound, fever above 101 F,
difficulty breathing, swelling in the neck.

Contact: Head & Neck OPD (Mon, Thu) 0172-000-1001 (fictional). Emergency: 112`,
  },
  {
    id: 'D2', type: 'histopathology', date: D.d2, title: 'Histopathology report', pages: 1,
    text: `${HOSPITAL}
Department of Pathology
HISTOPATHOLOGY REPORT

Patient: Ramesh K. (synthetic)    Reg. No: NRCI-DEMO-2041    Report date: ${paperDate(D.d2)}
Specimen: Right partial glossectomy with right neck dissection

Microscopy: Moderately differentiated squamous cell carcinoma.
Tumour size: 2.6 cm. Depth of invasion: 7 mm.
Margins: All margins free of tumour (closest margin 6 mm).
Lymph nodes: 1 of 24 nodes positive (level II), no extranodal extension.
Stage: pT2 N1.

Impression: Completely excised tongue cancer with one involved neck node.
Adjuvant radiotherapy recommended by tumour board.`,
  },
  {
    id: 'D3', type: 'rt_summary', date: D.d3, title: 'Radiotherapy completion summary', pages: 2,
    text: `${HOSPITAL}
Department of Radiation Oncology
RADIOTHERAPY COMPLETION SUMMARY

Patient: Ramesh K. (synthetic)    Reg. No: NRCI-DEMO-2041
Consultant: Dr. M. Bedi (Radiation Oncology, fictional)
Treatment: IMRT to tongue and right neck, 60 Gy in 30 fractions,
${paperDate(D.rtStart)} to ${paperDate(D.d3)}. Completed as planned.

Medicines:
1. Benzydamine 0.15% mouthwash 15 ml gargle  1-1-1  x 30 days
2. Lignocaine 2% viscous 5 ml before meals  SOS for mouth pain
3. Tab Fluconazole 150 mg  1-0-0  x 7 days
4. Sodium fluoride 1.1% gel  apply at bedtime  long term
5. Protein supplement powder 2 scoops  1-0-1
6. Tab Pantoprazole 40 mg  1-0-0 before breakfast  x 30 days

Follow-up:
- Radiation Oncology OPD after 8 weeks.
- PET-CT scan after 12 weeks.
- Dental review in 1 month.
- Thyroid test (TSH) every 6 months.

Care at home:
- Jaw-opening exercises 3 times a day, 20 times each.
- Swallowing exercises as taught.
- Moisturise the treated neck skin; avoid direct sun.
- Brush with a soft brush after meals.

Diet: Soft, high-protein diet in small frequent meals. Avoid hot and spicy food.
Weigh yourself every week.

Warning signs: bleeding from mouth, fever above 101 F, unable to swallow liquids,
new swelling in the neck, weight loss over 2 kg in a week.

Radiation Oncology OPD (Tue, Fri) 0172-000-1002 (fictional).`,
  },
  {
    id: 'D4', type: 'prescription', date: D.d4, title: 'OPD prescription (Head & Neck)', pages: 1,
    text: `${HOSPITAL}
Head & Neck Surgery OPD    Date: ${paperDate(D.d4)}
Patient: Ramesh K. (synthetic)    Reg. No: NRCI-DEMO-2041

Review: Healing well. Complains of dry mouth.

Rx
1. Stop Pantoprazole.
2. Tab Pilocarpine 5 mg  1-1-1  x 30 days (for dry mouth)
3. Continue fluoride gel at bedtime.
4. Tab Paracetamol 650 mg  SOS for pain

Investigations: CBC, KFT, TSH (sample given today).
Review after 4 weeks.
Dr. S. Arora`,
  },
  {
    id: 'D5', type: 'lab_report', date: D.d5, title: 'Blood test report', pages: 1,
    text: `CITYCARE DIAGNOSTICS (fictional)    Collected: ${paperDate(D.d5)}
Patient: Ramesh K. (synthetic)    Ref: NRCI-DEMO-2041

Test                     Result     Unit        Reference
Haemoglobin              12.1  L    g/dL        13.0 - 17.0
Total WBC count          6,800      /cumm       4,000 - 11,000
Platelet count           2.4        lakh/cumm   1.5 - 4.5
Serum creatinine         0.9        mg/dL       0.7 - 1.3
Blood urea               28         mg/dL       15 - 40
TSH                      3.1        uIU/mL      0.4 - 4.0

Remarks: Mild anaemia. Kidney function and thyroid within normal limits.`,
  },
  {
    id: 'D6', type: 'bill', date: D.d1, title: 'Final hospital bill (surgery)', pages: 1,
    text: `${HOSPITAL}
FINAL BILL - INPATIENT    Bill No: NRCI/IP/2026/0412    Date: ${paperDate(D.d1)}
Patient: Ramesh K. (synthetic)    Reg. No: NRCI-DEMO-2041

Room and nursing             Rs 38,000
Operation theatre and surgeon Rs 96,500
Medicines and consumables    Rs 31,000
Investigations               Rs 19,000
TOTAL                        Rs 1,84,500

Payer: HealthSure Insurance (fictional)   Claim ref: HS-CLM-77821
Cashless approved: Rs 1,50,000    Paid by patient: Rs 34,500`,
  },
  {
    id: 'D7', type: 'bill', date: D.d3, title: 'Radiotherapy bill', pages: 1,
    text: `${HOSPITAL}
Department of Radiation Oncology    Bill No: NRCI/RT/2026/1187    Date: ${paperDate(D.d3)}
Patient: Ramesh K. (synthetic)

IMRT planning and 30 fractions   Rs 92,000
TOTAL                            Rs 92,000
Paid by patient. Reimbursement claim to be filed with insurer within 30 days.`,
  },
  {
    id: 'D8', type: 'bill', date: D.d8c, title: 'Pharmacy receipts (3)', pages: 1,
    text: `PHARMACY RECEIPTS (3)

Receipt 1 - Hospital pharmacy    ${paperDate(D.d8a)}    Rs 1,180
Receipt 2 - Hospital pharmacy    ${paperDate(D.d8b)}    Rs 1,460
Receipt 3 - Sharma Medicos (fictional)    ${paperDate(D.d8c)}    Rs 600

Total paid: Rs 3,240`,
  },
];

// ---------- Saved answer key: extraction for each sample document ----------
// Same schema the live AI returns. Every item carries a verbatim quote.
const CACHED_EXTRACTIONS = {
  D1: {
    doc_type: 'discharge_summary', doc_date: D.d1, department: 'Head & Neck Surgery',
    patient: { name: 'Ramesh K. (synthetic)', age_sex: '56/M', reg_no: 'NRCI-DEMO-2041', allergies: 'None known' },
    condition: 'head_neck_cancer',
    diagnosis: [{ text: 'Squamous cell carcinoma, right lateral border of tongue', quote: 'Diagnosis: Squamous cell carcinoma, right lateral border of tongue.' }],
    treatment: [{ text: `Right partial glossectomy with right selective neck dissection on ${paperDate(D.surgery)}`, quote: 'Procedure: Right partial glossectomy with right selective neck dissection (levels I-IV)' }],
    medicines: [
      { name: 'Amoxicillin-Clavulanate 625 mg', salt: 'Amoxicillin + Clavulanic acid', strength: '625 mg', form: 'tablet', dose_pattern: '1-0-1', timing: 'after food', duration_days: 5, long_term: false, sos: false, action: 'start', quote: '1. Tab Amoxicillin-Clavulanate 625 mg  1-0-1 after food  x 5 days' },
      { name: 'Paracetamol 650 mg', salt: 'Paracetamol', strength: '650 mg', form: 'tablet', dose_pattern: '1-1-1', timing: null, duration_days: 5, long_term: false, sos: false, then_sos: true, action: 'start', quote: '2. Tab Paracetamol 650 mg  1-1-1  x 5 days, then SOS for pain' },
      { name: 'Pantoprazole 40 mg', salt: 'Pantoprazole', strength: '40 mg', form: 'tablet', dose_pattern: '1-0-0', timing: 'before breakfast', duration_days: 14, long_term: false, sos: false, action: 'start', quote: '3. Tab Pantoprazole 40 mg  1-0-0 before breakfast  x 14 days' },
      { name: 'Chlorhexidine 0.2% mouthwash', salt: 'Chlorhexidine', strength: '0.2%', form: 'mouthwash', dose_pattern: '1-1-1', timing: 'rinse 10 ml', duration_days: 14, long_term: false, sos: false, action: 'start', quote: '4. Chlorhexidine 0.2% mouthwash 10 ml rinse  1-1-1  x 14 days' },
    ],
    visits: [{ department: 'Head & Neck Surgery OPD', due_in_days: 7, quote: 'Follow-up: Head & Neck Surgery OPD after 7 days with histopathology report.' }],
    tests: [],
    diet: [{ en: 'Soft diet', hi: 'नरम खाना', quote: 'Advice: Soft diet.' }],
    precautions: [
      { en: 'Keep the neck wound clean and dry', hi: 'गर्दन के घाव को साफ और सूखा रखें', quote: 'Keep the neck wound clean and dry.' },
      { en: 'No tobacco, alcohol or areca nut', hi: 'तंबाकू, शराब या सुपारी बिल्कुल नहीं', quote: 'No tobacco, alcohol or areca nut.' },
    ],
    exercises: [{ en: 'Tongue and jaw movement exercises as taught', hi: 'सिखाए गए अनुसार जीभ और जबड़े की कसरत', freq_per_day: null, quote: 'Tongue and jaw movement exercises as taught.' }],
    warning_signs: [
      { en: 'Bleeding from mouth or wound', hi: 'मुंह या घाव से खून आना', quote: 'Return to emergency if: bleeding from mouth or wound' },
      { en: 'Fever above 101°F', hi: '101°F से ज़्यादा बुखार', quote: 'fever above 101 F' },
      { en: 'Difficulty breathing', hi: 'सांस लेने में तकलीफ', quote: 'difficulty breathing' },
      { en: 'Swelling in the neck', hi: 'गर्दन में सूजन', quote: 'swelling in the neck.' },
    ],
    results: [], bills: [],
    contacts: [{ name: 'Head & Neck Surgery OPD (Mon, Thu)', phone: '0172-000-1001', quote: 'Contact: Head & Neck OPD (Mon, Thu) 0172-000-1001 (fictional).' }],
    summary_en: 'Surgery discharge: tongue cancer removed with neck node clearance; four medicines for the first two weeks.',
    summary_hi: 'सर्जरी के बाद छुट्टी: जीभ का कैंसर और गर्दन की गांठें निकाली गईं; पहले दो हफ्तों के लिए चार दवाएं।',
  },
  D2: {
    doc_type: 'histopathology', doc_date: D.d2, department: 'Pathology', condition: 'head_neck_cancer',
    diagnosis: [{ text: 'Moderately differentiated squamous cell carcinoma, pT2 N1; margins clear; 1 of 24 nodes positive', quote: 'Stage: pT2 N1.' }],
    treatment: [], medicines: [], visits: [], tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], bills: [], contacts: [],
    results: [
      { test: 'Margins', value: 'All margins free of tumour (closest 6 mm)', flag: 'good', quote: 'Margins: All margins free of tumour (closest margin 6 mm).' },
      { test: 'Lymph nodes', value: '1 of 24 positive, no extranodal extension', flag: 'attention', quote: 'Lymph nodes: 1 of 24 nodes positive (level II), no extranodal extension.' },
    ],
    summary_en: 'The whole tumour was removed with clear edges. One of 24 neck lymph nodes had cancer, so radiotherapy was advised.',
    summary_hi: 'पूरा ट्यूमर साफ किनारों के साथ निकाल दिया गया। गर्दन की 24 में से 1 गांठ में कैंसर था, इसलिए रेडियोथेरेपी की सलाह दी गई।',
  },
  D3: {
    doc_type: 'rt_summary', doc_date: D.d3, department: 'Radiation Oncology', condition: 'head_neck_cancer',
    diagnosis: [],
    treatment: [{ text: `Radiotherapy (IMRT) 60 Gy in 30 fractions, ${paperDate(D.rtStart)} to ${paperDate(D.d3)}`, quote: 'Treatment: IMRT to tongue and right neck, 60 Gy in 30 fractions,' }],
    medicines: [
      { name: 'Benzydamine 0.15% mouthwash', salt: 'Benzydamine', strength: '0.15%', form: 'mouthwash', dose_pattern: '1-1-1', timing: 'gargle 15 ml', duration_days: 30, long_term: false, sos: false, action: 'start', quote: '1. Benzydamine 0.15% mouthwash 15 ml gargle  1-1-1  x 30 days' },
      { name: 'Lignocaine 2% viscous', salt: 'Lignocaine', strength: '2%', form: 'gel', dose_pattern: null, timing: 'before meals', duration_days: null, long_term: false, sos: true, action: 'start', quote: '2. Lignocaine 2% viscous 5 ml before meals  SOS for mouth pain' },
      { name: 'Fluconazole 150 mg', salt: 'Fluconazole', strength: '150 mg', form: 'tablet', dose_pattern: '1-0-0', timing: null, duration_days: 7, long_term: false, sos: false, action: 'start', quote: '3. Tab Fluconazole 150 mg  1-0-0  x 7 days' },
      { name: 'Sodium fluoride 1.1% gel', salt: 'Sodium fluoride', strength: '1.1%', form: 'gel', dose_pattern: '0-0-1', timing: 'at bedtime', duration_days: null, long_term: true, sos: false, action: 'start', quote: '4. Sodium fluoride 1.1% gel  apply at bedtime  long term' },
      { name: 'Protein supplement powder', salt: 'Whey protein', strength: '2 scoops', form: 'powder', dose_pattern: '1-0-1', timing: null, duration_days: null, long_term: false, sos: false, action: 'start', quote: '5. Protein supplement powder 2 scoops  1-0-1' },
      { name: 'Pantoprazole 40 mg', salt: 'Pantoprazole', strength: '40 mg', form: 'tablet', dose_pattern: '1-0-0', timing: 'before breakfast', duration_days: 30, long_term: false, sos: false, action: 'start', quote: '6. Tab Pantoprazole 40 mg  1-0-0 before breakfast  x 30 days' },
    ],
    visits: [{ department: 'Radiation Oncology OPD', due_in_days: 56, quote: '- Radiation Oncology OPD after 8 weeks.' }, { department: 'Dental review', due_in_days: 30, quote: '- Dental review in 1 month.' }],
    tests: [
      { name: 'PET-CT scan', due_in_days: 84, interval_months: null, prep: 'Usually fasting 4–6 hours; confirm with the scan centre', quote: '- PET-CT scan after 12 weeks.' },
      { name: 'TSH (thyroid test)', due_in_days: null, interval_months: 6, prep: null, quote: '- Thyroid test (TSH) every 6 months.' },
    ],
    diet: [
      { en: 'Soft, high-protein diet in small frequent meals', hi: 'नरम, ज़्यादा प्रोटीन वाला खाना, थोड़ा-थोड़ा कई बार', quote: 'Diet: Soft, high-protein diet in small frequent meals.' },
      { en: 'Avoid hot and spicy food', hi: 'गरम और मसालेदार खाना न खाएं', quote: 'Avoid hot and spicy food.' },
      { en: 'Weigh yourself every week', hi: 'हर हफ्ते वज़न लें', quote: 'Weigh yourself every week.' },
    ],
    precautions: [
      { en: 'Moisturise the treated neck skin; avoid direct sun', hi: 'इलाज वाली गर्दन की त्वचा पर मॉइस्चराइज़र लगाएं; सीधी धूप से बचें', quote: '- Moisturise the treated neck skin; avoid direct sun.' },
      { en: 'Brush with a soft brush after meals', hi: 'खाने के बाद मुलायम ब्रश से दांत साफ करें', quote: '- Brush with a soft brush after meals.' },
    ],
    exercises: [
      { en: 'Jaw-opening exercises, 20 times each', hi: 'मुंह खोलने की कसरत, हर बार 20 बार', freq_per_day: 3, quote: '- Jaw-opening exercises 3 times a day, 20 times each.' },
      { en: 'Swallowing exercises as taught', hi: 'सिखाए गए अनुसार निगलने की कसरत', freq_per_day: null, quote: '- Swallowing exercises as taught.' },
    ],
    warning_signs: [
      { en: 'Bleeding from mouth', hi: 'मुंह से खून आना', quote: 'Warning signs: bleeding from mouth' },
      { en: 'Fever above 101°F', hi: '101°F से ज़्यादा बुखार', quote: 'fever above 101 F' },
      { en: 'Unable to swallow liquids', hi: 'पानी या तरल निगल न पाना', quote: 'unable to swallow liquids' },
      { en: 'New swelling in the neck', hi: 'गर्दन में नई सूजन', quote: 'new swelling in the neck' },
      { en: 'Weight loss over 2 kg in a week', hi: 'एक हफ्ते में 2 किलो से ज़्यादा वज़न घटना', quote: 'weight loss over 2 kg in a week.' },
    ],
    results: [], bills: [],
    contacts: [{ name: 'Radiation Oncology OPD (Tue, Fri)', phone: '0172-000-1002', quote: 'Radiation Oncology OPD (Tue, Fri) 0172-000-1002 (fictional).' }],
    summary_en: 'Radiotherapy finished as planned. New mouth-care medicines, a PET-CT after 12 weeks, dental and thyroid checks.',
    summary_hi: 'रेडियोथेरेपी योजना के अनुसार पूरी हुई। मुंह की देखभाल की नई दवाएं, 12 हफ्ते बाद PET-CT, दांत और थायराइड की जांच।',
  },
  D4: {
    doc_type: 'prescription', doc_date: D.d4, department: 'Head & Neck Surgery OPD', condition: 'head_neck_cancer',
    diagnosis: [], treatment: [],
    medicines: [
      { name: 'Pantoprazole', salt: 'Pantoprazole', strength: null, form: 'tablet', dose_pattern: null, timing: null, duration_days: null, long_term: false, sos: false, action: 'stop', quote: '1. Stop Pantoprazole.' },
      { name: 'Pilocarpine 5 mg', salt: 'Pilocarpine', strength: '5 mg', form: 'tablet', dose_pattern: '1-1-1', timing: null, duration_days: 30, long_term: false, sos: false, action: 'start', quote: '2. Tab Pilocarpine 5 mg  1-1-1  x 30 days (for dry mouth)' },
      { name: 'Sodium fluoride gel', salt: 'Sodium fluoride', strength: null, form: 'gel', dose_pattern: '0-0-1', timing: 'at bedtime', duration_days: null, long_term: true, sos: false, action: 'continue', quote: '3. Continue fluoride gel at bedtime.' },
      { name: 'Paracetamol 650 mg', salt: 'Paracetamol', strength: '650 mg', form: 'tablet', dose_pattern: null, timing: null, duration_days: null, long_term: false, sos: true, action: 'continue', quote: '4. Tab Paracetamol 650 mg  SOS for pain' },
    ],
    visits: [{ department: 'Head & Neck Surgery OPD', due_in_days: 28, quote: 'Review after 4 weeks.' }],
    tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], results: [], bills: [], contacts: [],
    summary_en: 'Healing well. Pantoprazole stopped; Pilocarpine started for dry mouth; review in 4 weeks.',
    summary_hi: 'घाव ठीक भर रहा है। Pantoprazole बंद; मुंह सूखने के लिए Pilocarpine शुरू; 4 हफ्ते बाद दिखाना है।',
  },
  D5: {
    doc_type: 'lab_report', doc_date: D.d5, department: 'Diagnostics', condition: null,
    diagnosis: [], treatment: [], medicines: [], visits: [], tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], bills: [], contacts: [],
    results: [
      { test: 'Haemoglobin', value: '12.1 g/dL (13.0–17.0)', flag: 'low', quote: 'Haemoglobin              12.1  L    g/dL        13.0 - 17.0' },
      { test: 'Serum creatinine', value: '0.9 mg/dL (0.7–1.3)', flag: 'normal', quote: 'Serum creatinine         0.9        mg/dL       0.7 - 1.3' },
      { test: 'TSH (thyroid test)', value: '3.1 uIU/mL (0.4–4.0)', flag: 'normal', quote: 'TSH                      3.1        uIU/mL      0.4 - 4.0' },
    ],
    summary_en: 'Mild anaemia (haemoglobin a little low). Kidney function and thyroid normal.',
    summary_hi: 'हल्की खून की कमी (हीमोग्लोबिन थोड़ा कम)। किडनी और थायराइड सामान्य।',
  },
  D6: {
    doc_type: 'bill', doc_date: D.d1, department: 'Billing', condition: null,
    diagnosis: [], treatment: [], medicines: [], visits: [], tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], results: [], contacts: [],
    bills: [{ bill_no: 'NRCI/IP/2026/0412', what: 'Surgery stay', amount: 184500, payer: 'Insurance (cashless ₹1,50,000) + self ₹34,500', claim_status: 'Cashless approved', quote: 'TOTAL                        Rs 1,84,500' }],
    summary_en: 'Surgery bill ₹1,84,500; insurer paid ₹1,50,000 cashless.', summary_hi: 'सर्जरी का बिल ₹1,84,500; बीमा ने ₹1,50,000 कैशलेस दिए।',
  },
  D7: {
    doc_type: 'bill', doc_date: D.d3, department: 'Billing', condition: null,
    diagnosis: [], treatment: [], medicines: [], visits: [], tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], results: [], contacts: [],
    bills: [{ bill_no: 'NRCI/RT/2026/1187', what: 'Radiotherapy', amount: 92000, payer: 'Self', claim_status: `Reimbursement claim due by ${paperDate(addDaysIso(D.d3, 30))}`, claim_due: addDaysIso(D.d3, 30), quote: 'TOTAL                            Rs 92,000' }],
    summary_en: 'Radiotherapy bill ₹92,000, paid by the family; reimbursement claim due within 30 days.', summary_hi: 'रेडियोथेरेपी का बिल ₹92,000, परिवार ने भरा; 30 दिन में बीमा क्लेम करना है।',
  },
  D8: {
    doc_type: 'bill', doc_date: D.d8c, department: 'Pharmacy', condition: null,
    diagnosis: [], treatment: [], medicines: [], visits: [], tests: [], diet: [], precautions: [], exercises: [], warning_signs: [], results: [], contacts: [],
    bills: [
      { bill_no: 'Receipt 1', what: 'Hospital pharmacy', amount: 1180, payer: 'Self', claim_status: 'Add to claim', quote: `Receipt 1 - Hospital pharmacy    ${paperDate(D.d8a)}    Rs 1,180` },
      { bill_no: 'Receipt 2', what: 'Hospital pharmacy', amount: 1460, payer: 'Self', claim_status: 'Add to claim', quote: `Receipt 2 - Hospital pharmacy    ${paperDate(D.d8b)}    Rs 1,460` },
      { bill_no: 'Receipt 3', what: 'Sharma Medicos', amount: 600, payer: 'Self', claim_status: 'Add to claim', quote: `Receipt 3 - Sharma Medicos (fictional)    ${paperDate(D.d8c)}    Rs 600` },
    ],
    summary_en: 'Three pharmacy receipts, ₹3,240 in total.', summary_hi: 'दवा की तीन रसीदें, कुल ₹3,240।',
  },
};

// ---------- Medicine box at home (pre-filled on S10) ----------
const SAMPLE_HOME = [
  { name: 'Pantoprazole 40', salt: 'Pantoprazole', qty: 10, unit: 'tablets' },
  { name: 'Paracetamol 650', salt: 'Paracetamol', qty: 15, unit: 'tablets' },
  { name: 'Benzydamine mouthwash', salt: 'Benzydamine', qty: 0.5, unit: 'bottle' },
  { name: 'Fluoride gel', salt: 'Sodium fluoride', qty: 1, unit: 'tube' },
  { name: 'Chlorhexidine mouthwash (old)', salt: 'Chlorhexidine', qty: 1, unit: 'bottle' },
  { name: 'Vitamin B-complex', salt: 'Vitamin B complex', qty: 20, unit: 'capsules' },
];

// ---------- Mock catalogue (PRICES ARE ILLUSTRATIVE) ----------
// per_pack: units per pack for tablets; days_per_pack for liquids, gels and powders.
const CATALOGUE = [
  { salt: 'Pilocarpine', strength: '5 mg', product: 'Pilocarpine 5 (Brand A)', pack: '10 tablets', per_pack: 10, online: 210, jan: null, local: 230 },
  { salt: 'Pilocarpine', strength: '5 mg', product: 'Pilocarpine 5 (Generic)', pack: '10 tablets', per_pack: 10, online: 95, jan: 60, local: 110 },
  { salt: 'Benzydamine', strength: '0.15%', product: 'Benzydamine 0.15% (Brand B)', pack: '300 ml', days_per_pack: 6, online: 185, jan: null, local: 195 },
  { salt: 'Benzydamine', strength: '0.15%', product: 'Benzydamine 0.15% (Generic)', pack: '300 ml', days_per_pack: 6, online: 90, jan: 55, local: 100 },
  { salt: 'Pantoprazole', strength: '40 mg', product: 'Pantoprazole 40 (Generic)', pack: '15 tablets', per_pack: 15, online: 40, jan: 15, local: 45 },
  { salt: 'Paracetamol', strength: '650 mg', product: 'Paracetamol 650 (Brand C)', pack: '15 tablets', per_pack: 15, online: 34, jan: null, local: 35 },
  { salt: 'Paracetamol', strength: '650 mg', product: 'Paracetamol 650 (Generic)', pack: '15 tablets', per_pack: 15, online: 22, jan: 12, local: 25 },
  { salt: 'Sodium fluoride', strength: '1.1%', product: 'Sodium fluoride 1.1% gel', pack: '50 g', days_per_pack: 30, online: 160, jan: null, local: 170 },
  { salt: 'Lignocaine', strength: '2%', product: 'Lignocaine 2% viscous', pack: '100 ml', days_per_pack: 20, online: 75, jan: null, local: 80 },
  { salt: 'Whey protein', strength: '2 scoops', product: 'Protein supplement', pack: '400 g', days_per_pack: 10, online: 650, jan: null, local: 700 },
  { salt: 'Fluconazole', strength: '150 mg', product: 'Fluconazole 150 (Generic)', pack: '1 tablet', per_pack: 1, online: 12, jan: 6, local: 15 },
  { salt: 'Amoxicillin + Clavulanic acid', strength: '625 mg', product: 'Amoxicillin-Clavulanate 625 (Generic)', pack: '6 tablets', per_pack: 6, online: 95, jan: 48, local: 110 },
  { salt: 'Chlorhexidine', strength: '0.2%', product: 'Chlorhexidine 0.2% mouthwash', pack: '150 ml', days_per_pack: 5, online: 80, jan: null, local: 85 },
];

// Brand / name -> salt dictionary (code decides the salt; the AI only suggests)
const SALT_DICTIONARY = {
  'pan 40': 'Pantoprazole', pantocid: 'Pantoprazole', pantoprazole: 'Pantoprazole',
  dolo: 'Paracetamol', crocin: 'Paracetamol', calpol: 'Paracetamol', paracetamol: 'Paracetamol',
  augmentin: 'Amoxicillin + Clavulanic acid', 'amoxicillin-clavulanate': 'Amoxicillin + Clavulanic acid', amoxyclav: 'Amoxicillin + Clavulanic acid',
  tantum: 'Benzydamine', benzydamine: 'Benzydamine', hexidine: 'Chlorhexidine', chlorhexidine: 'Chlorhexidine',
  'fluoride': 'Sodium fluoride', 'sodium fluoride': 'Sodium fluoride', xylocaine: 'Lignocaine', lignocaine: 'Lignocaine', lidocaine: 'Lignocaine',
  forcan: 'Fluconazole', fluconazole: 'Fluconazole', salagen: 'Pilocarpine', pilocarpine: 'Pilocarpine',
  protein: 'Whey protein', 'b-complex': 'Vitamin B complex', becosules: 'Vitamin B complex', thyronorm: 'Levothyroxine', eltroxin: 'Levothyroxine',
  ecosprin: 'Aspirin', clopilet: 'Clopidogrel', atorva: 'Atorvastatin', telma: 'Telmisartan', metformin: 'Metformin', glycomet: 'Metformin',
};

// ---------- Journey checklist templates (knowledge base) ----------
const JOURNEYS = {
  head_neck_cancer: {
    name: { en: 'Head and neck cancer, after surgery and radiotherapy', hi: 'सिर और गर्दन का कैंसर, सर्जरी और रेडियोथेरेपी के बाद' },
    docs: [
      { type: 'discharge_summary', en: 'Discharge summary' }, { type: 'histopathology', en: 'Histopathology report' },
      { type: 'rt_summary', en: 'Radiotherapy summary' }, { type: 'prescription', en: 'Latest OPD prescription' },
      { type: 'lab_report', en: 'Blood test report' }, { type: 'imaging', en: 'PET-CT / scan report', due_note: 'Expected after the first PET-CT' },
    ],
    items: [
      { id: 'pet', en: 'Baseline PET-CT or scan after treatment', hi: 'इलाज के बाद पहला PET-CT स्कैन', keys: ['pet', 'pet-ct', 'scan', 'mri'], q: 'When should the first scan after treatment be done?' },
      { id: 'tsh', en: 'Thyroid test (TSH) at regular intervals', hi: 'नियमित थायराइड (TSH) जांच', keys: ['tsh', 'thyroid'], q: 'How often should his thyroid (TSH) be checked?' },
      { id: 'dental', en: 'Dental check-up', hi: 'दांतों की जांच', keys: ['dental', 'dentist'], q: 'When should he see the dentist?' },
      { id: 'rtopd', en: 'Radiation oncology follow-up', hi: 'रेडिएशन ऑन्कोलॉजी फॉलो-अप', keys: ['radiation oncology'], q: 'When is the next radiation oncology visit?' },
      { id: 'jaw', en: 'Jaw-opening exercises', hi: 'मुंह खोलने की कसरत', keys: ['jaw'], q: 'Which jaw exercises should he do, and how often?' },
      { id: 'fluoride', en: 'Fluoride and mouth care', hi: 'फ्लोराइड और मुंह की देखभाल', keys: ['fluoride'], q: 'Does he need fluoride gel, and for how long?' },
      { id: 'speech', en: 'Speech and swallow therapy', hi: 'बोलने और निगलने की थेरेपी', keys: ['speech', 'therapist', 'slp'], q: 'Should he see a speech and swallow therapist?' },
      { id: 'weight', en: 'Diet and weight checks', hi: 'खाना और वज़न की जांच', keys: ['weigh', 'weight', 'protein'], q: 'What weight should we watch for?' },
      { id: 'tobacco', en: 'No tobacco, alcohol or areca nut', hi: 'तंबाकू, शराब, सुपारी बंद', keys: ['tobacco', 'areca'], q: 'Any advice on tobacco or alcohol?' },
    ],
  },
  heart_attack: {
    name: { en: 'Heart attack treated with angioplasty', hi: 'हार्ट अटैक, एंजियोप्लास्टी के बाद' },
    docs: [{ type: 'discharge_summary', en: 'Discharge summary' }, { type: 'prescription', en: 'Latest prescription' }, { type: 'lab_report', en: 'Blood test report' }, { type: 'imaging', en: 'Echo or angiography report' }],
    items: [
      { id: 'antiplatelet', en: 'Blood thinners', hi: 'खून पतला करने की दवा', keys: ['aspirin', 'clopidogrel', 'ticagrelor', 'prasugrel'], q: 'How long should he take the blood thinners?' },
      { id: 'statin', en: 'Cholesterol medicine', hi: 'कोलेस्ट्रॉल की दवा', keys: ['statin', 'atorvastatin', 'rosuvastatin'], q: 'Should he continue the cholesterol medicine?' },
      { id: 'cardio', en: 'Cardiology follow-up', hi: 'कार्डियोलॉजी फॉलो-अप', keys: ['cardiology'], q: 'When is the cardiology review?' },
      { id: 'lipid', en: 'Repeat lipid test', hi: 'लिपिड जांच', keys: ['lipid', 'cholesterol'], q: 'When should the lipid test be repeated?' },
      { id: 'rehab', en: 'Cardiac rehab and activity plan', hi: 'कार्डियक रिहैब', keys: ['rehab', 'walk', 'activity'], q: 'What activity is safe, and is cardiac rehab advised?' },
      { id: 'chest', en: 'Chest-pain warning signs', hi: 'सीने में दर्द के चेतावनी संकेत', keys: ['chest pain'], q: 'What should we do if chest pain returns?' },
    ],
  },
  general: {
    name: { en: 'After any hospital stay', hi: 'किसी भी अस्पताल में भर्ती के बाद' },
    docs: [{ type: 'discharge_summary', en: 'Discharge summary' }, { type: 'prescription', en: 'Latest prescription' }, { type: 'bill', en: 'Final bill' }],
    items: [
      { id: 'followup', en: 'A follow-up visit date', hi: 'अगली जांच की तारीख', keys: ['follow-up', 'review', 'opd'], q: 'When is the follow-up visit?' },
      { id: 'warn', en: 'Warning signs to watch', hi: 'चेतावनी संकेत', keys: ['emergency', 'warning', 'return'], q: 'Which symptoms mean we should come back?' },
      { id: 'diet', en: 'Diet advice', hi: 'खाने की सलाह', keys: ['diet', 'food'], q: 'Any food restrictions?' },
    ],
  },
};

const DOC_TYPE_LABEL = {
  discharge_summary: { en: 'Discharge summary', hi: 'डिस्चार्ज सारांश' }, histopathology: { en: 'Histopathology', hi: 'बायोप्सी रिपोर्ट' },
  rt_summary: { en: 'Radiotherapy summary', hi: 'रेडियोथेरेपी सारांश' }, prescription: { en: 'Prescription', hi: 'पर्चा' },
  lab_report: { en: 'Lab report', hi: 'लैब रिपोर्ट' }, imaging: { en: 'Scan report', hi: 'स्कैन रिपोर्ट' }, bill: { en: 'Bill', hi: 'बिल' }, other: { en: 'Other', hi: 'अन्य' },
};

// Synonyms used for search and gap matching (English + common Hindi words)
const SYNONYMS = {
  mouthwash: ['gargle', 'rinse', 'benzydamine', 'chlorhexidine'], gargle: ['mouthwash', 'rinse'], scan: ['pet-ct', 'pet', 'ct', 'mri'], pet: ['pet-ct', 'scan'],
  thyroid: ['tsh'], tsh: ['thyroid'], bill: ['rs', 'total', 'receipt', 'amount'], money: ['bill', 'total', 'paid'], claim: ['insurance', 'reimbursement', 'cashless'],
  pain: ['paracetamol', 'lignocaine', 'sos'], 'dry': ['pilocarpine'], doctor: ['opd', 'review', 'follow-up'], visit: ['opd', 'review', 'follow-up'], next: ['after', 'review', 'follow-up'],
  food: ['diet', 'meals'], eat: ['diet', 'meals', 'food'], exercise: ['jaw', 'swallowing', 'exercises'], teeth: ['dental', 'brush', 'fluoride'], emergency: ['warning', 'bleeding', 'fever'],
  'दवा': ['medicine', 'tab'], 'स्कैन': ['scan', 'pet-ct'], 'बिल': ['bill', 'total'], 'थायराइड': ['tsh', 'thyroid'], 'खाना': ['diet', 'food'], 'कसरत': ['exercises', 'jaw'],
  'डॉक्टर': ['opd', 'review'], 'कुल्ला': ['mouthwash', 'gargle'], 'दर्द': ['pain', 'sos'], 'बुखार': ['fever'], 'खर्च': ['bill', 'total'],
};

// ---------- Medicine knowledge base: what it is for, and what it looks like ----------
// Look = typical appearance for the demo; colour and shape vary by brand, so the app asks families to match the strip.
const MED_INFO = {
  Pilocarpine: { purpose: { en: 'For dry mouth', hi: 'मुंह सूखने के लिए' }, kind: { en: 'Saliva helper', hi: 'लार बढ़ाने की दवा' }, look: { shape: 'round', color: '#FFFFFF', en: 'small white round tablet', hi: 'छोटी सफ़ेद गोल गोली' } },
  Benzydamine: { purpose: { en: 'Soothes mouth sores and pain', hi: 'मुंह के छालों और दर्द में आराम' }, kind: { en: 'Mouthwash (gargle, do not swallow)', hi: 'कुल्ला (निगलना नहीं)' }, look: { shape: 'bottle', color: '#3BAA6B', en: 'green liquid in a bottle', hi: 'हरी दवा, बोतल में' } },
  Lignocaine: { purpose: { en: 'Numbs mouth pain before eating', hi: 'खाने से पहले मुंह सुन्न करती है' }, kind: { en: 'Numbing gel', hi: 'सुन्न करने वाला जैल' }, look: { shape: 'bottle', color: '#CFE7F5', en: 'clear thick liquid, small bottle', hi: 'पारदर्शी गाढ़ी दवा, छोटी बोतल' } },
  Paracetamol: { purpose: { en: 'Painkiller and fever', hi: 'दर्द और बुखार की दवा' }, kind: { en: 'Painkiller', hi: 'दर्द निवारक' }, look: { shape: 'long', color: '#FFFFFF', en: 'white long tablet', hi: 'सफ़ेद लंबी गोली' } },
  'Whey protein': { purpose: { en: 'Extra protein for healing and weight', hi: 'घाव भरने और वज़न के लिए प्रोटीन' }, kind: { en: 'Nutrition powder', hi: 'पोषण पाउडर' }, look: { shape: 'tin', color: '#F2C14E', en: 'powder in a tin, mix in milk or water', hi: 'डिब्बे में पाउडर, दूध या पानी में मिलाएं' } },
  'Sodium fluoride': { purpose: { en: 'Protects teeth after radiation', hi: 'रेडिएशन के बाद दांतों की सुरक्षा' }, kind: { en: 'Tooth gel', hi: 'दांतों का जैल' }, look: { shape: 'tube', color: '#4C7BE0', en: 'blue tube of gel', hi: 'नीली ट्यूब में जैल' } },
  Pantoprazole: { purpose: { en: 'Reduces acidity', hi: 'एसिडिटी कम करती है' }, kind: { en: 'Acidity tablet', hi: 'गैस/एसिडिटी की गोली' }, look: { shape: 'oval', color: '#F5C842', en: 'yellow oval tablet', hi: 'पीली अंडाकार गोली' } },
  'Amoxicillin + Clavulanic acid': { purpose: { en: 'Antibiotic for infection', hi: 'इन्फेक्शन की एंटीबायोटिक' }, kind: { en: 'Antibiotic', hi: 'एंटीबायोटिक' }, look: { shape: 'long', color: '#FFFFFF', en: 'big white long tablet', hi: 'बड़ी सफ़ेद लंबी गोली' } },
  Chlorhexidine: { purpose: { en: 'Keeps the mouth clean after surgery', hi: 'सर्जरी के बाद मुंह साफ रखता है' }, kind: { en: 'Mouthwash', hi: 'कुल्ला' }, look: { shape: 'bottle', color: '#E97BA4', en: 'pink liquid in a bottle', hi: 'गुलाबी दवा, बोतल में' } },
  Fluconazole: { purpose: { en: 'For fungal infection (white patches) in the mouth', hi: 'मुंह के फंगल इन्फेक्शन (सफ़ेद धब्बे) के लिए' }, kind: { en: 'Antifungal', hi: 'फंगस की दवा' }, look: { shape: 'oval', color: '#F4A6B7', en: 'pink oval tablet', hi: 'गुलाबी अंडाकार गोली' } },
  'Vitamin B complex': { purpose: { en: 'Vitamin supplement', hi: 'विटामिन' }, kind: { en: 'Vitamin', hi: 'विटामिन' }, look: { shape: 'capsule', color: '#D64545', en: 'red capsule', hi: 'लाल कैप्सूल' } },
  Levothyroxine: { purpose: { en: 'Thyroid hormone', hi: 'थायराइड की दवा' }, kind: { en: 'Thyroid tablet', hi: 'थायराइड की गोली' }, look: { shape: 'round', color: '#FFFFFF', en: 'tiny white round tablet', hi: 'बहुत छोटी सफ़ेद गोल गोली' } },
  Aspirin: { purpose: { en: 'Blood thinner', hi: 'खून पतला करने की दवा' }, kind: { en: 'Blood thinner', hi: 'खून पतला करने वाली' }, look: { shape: 'round', color: '#F7A8A8', en: 'small pink round tablet', hi: 'छोटी गुलाबी गोल गोली' } },
};
