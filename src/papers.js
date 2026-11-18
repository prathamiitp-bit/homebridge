// ============================================================
// Printable sample papers (D1–D8) for the live demo.
// Same facts as SAMPLE_DOCS, laid out like real hospital printouts.
// Fictional hospital, synthetic patient. Every page says so in its footer.
// ============================================================

const PT = { name: 'Ramesh K.', ageSex: '56 / M', reg: 'NRCI-DEMO-2041', phone: '98XXX XXXXX' };
const FOOT = 'SPECIMEN · Fictional hospital and synthetic patient, made for the HomeBridge product demo. Not a medical record.';

function nrciHead(dept, title, extra = '') {
  return `<header class="lh nrci">
    <svg class="logo" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#0F4C75"/><path d="M27 14h10v13h13v10H37v13H27V37H14V27h13z" fill="#fff"/><path d="M32 46c-6-5-9-9-9-13a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 8-9 13z" fill="#E4572E"/></svg>
    <div class="lh-t"><div class="lh-n">NORTHERN REGIONAL CANCER INSTITUTE</div>
    <div class="lh-s">A fictional hospital for product demonstration · Medical Enclave, Sector 0, Chandigarh 160000 · Ph 0172-000-1000</div></div>
  </header>
  <div class="band"><span>${dept}</span><b>${title}</b>${extra ? `<span>${extra}</span>` : ''}</div>`;
}
function ptGrid(rows) {
  return `<table class="pt">${rows.map((r) => `<tr>${r.map(([k, v]) => `<td class="k">${k}</td><td>${v}</td>`).join('')}</tr>`).join('')}</table>`;
}
const SIG = (name, role) => `<div class="sig"><svg viewBox="0 0 160 46" class="scrawl"><path d="M6 32c10-22 18-24 20-10s-6 18 2 6 14-26 18-14-4 20 6 10 10-18 16-8 2 12 12 4 12-10 18-4 8 8 20 0 14-6 24-4" fill="none" stroke="#1d3b8b" stroke-width="2" stroke-linecap="round"/></svg><div>${name}</div><div class="r">${role}</div></div>`;
const STAMP = (label) => `<svg class="stamp" viewBox="0 0 120 120"><defs><path id="c${label.length}" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0"/></defs><circle cx="60" cy="60" r="56" fill="none" stroke="#6b3fa0" stroke-width="3"/><circle cx="60" cy="60" r="36" fill="none" stroke="#6b3fa0" stroke-width="1.5"/><text font-size="11" fill="#6b3fa0" letter-spacing="2"><textPath href="#c${label.length}">NRCI · FICTIONAL · ${label} ·</textPath></text><text x="60" y="64" text-anchor="middle" font-size="12" font-weight="700" fill="#6b3fa0">DEMO</text></svg>`;
const page = (id, body) => `<section class="page" data-doc="${id}">${body}<footer class="foot"><span>${FOOT}</span><span>${id}</span></footer></section>`;

function rxTable(rows) {
  return `<table class="grid"><thead><tr><th>#</th><th>Medicine</th><th>Dose / when</th><th>Duration</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${i + 1}</td><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`;
}

function paperD1() {
  return page('D1', `${nrciHead('Department of Head &amp; Neck Surgery', 'DISCHARGE SUMMARY', 'IPD No. 26-0412')}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Age / Sex', PT.ageSex]], [['Reg. No', PT.reg], ['Ward / Bed', 'Surgical ICU → Ward 4, Bed 12']], [['Admitted', paperDate(D.surgeryAdmit)], ['Discharged', paperDate(D.d1)]], [['Consultant', 'Dr. S. Arora (Head &amp; Neck Surgery)'], ['Known allergies', 'None known']]])}
  <h4>Diagnosis</h4><p>Squamous cell carcinoma, right lateral border of tongue.</p>
  <h4>Procedure</h4><p>Right partial glossectomy with right selective neck dissection (levels I-IV) on ${paperDate(D.surgery)}.</p>
  <h4>Course in hospital</h4><p>Uneventful recovery. Oral feeds started on day 3.</p>
  <h4>Medications on discharge</h4>
  ${rxTable([['Tab Amoxicillin-Clavulanate 625 mg', '1-0-1 after food', '5 days'], ['Tab Paracetamol 650 mg', '1-1-1', '5 days, then SOS for pain'], ['Tab Pantoprazole 40 mg', '1-0-0 before breakfast', '14 days'], ['Chlorhexidine 0.2% mouthwash 10 ml rinse', '1-1-1', '14 days']])}
  <h4>Advice</h4><p>Soft diet. Tongue and jaw movement exercises as taught. Keep the neck wound clean and dry. No tobacco, alcohol or areca nut.</p>
  <h4>Follow-up</h4><p>Head &amp; Neck Surgery OPD after 7 days with histopathology report. Radiotherapy planning as advised by Radiation Oncology.</p>
  <div class="warnbox"><b>Return to emergency if:</b> bleeding from mouth or wound, fever above 101 F, difficulty breathing, swelling in the neck.</div>
  <p class="small">Contact: Head &amp; Neck OPD (Mon, Thu) 0172-000-1001 (fictional). Emergency: 112</p>
  <div class="signrow">${STAMP('H&N SURGERY')}${SIG('Dr. S. Arora', 'MS, MCh · Head &amp; Neck Surgery')}</div>`);
}

function paperD2() {
  return page('D2', `${nrciHead('Department of Pathology', 'HISTOPATHOLOGY REPORT', 'Lab No. HP-26-0918')}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Age / Sex', PT.ageSex]], [['Reg. No', PT.reg], ['Report date', paperDate(D.d2)]], [['Referred by', 'Dr. S. Arora'], ['Specimen', 'Right partial glossectomy with right neck dissection']]])}
  <h4>Microscopy</h4><p>Moderately differentiated squamous cell carcinoma.</p>
  <table class="grid"><tbody>
  <tr><td>Tumour size</td><td>2.6 cm</td></tr><tr><td>Depth of invasion</td><td>7 mm</td></tr>
  <tr><td>Margins</td><td>All margins free of tumour (closest margin 6 mm)</td></tr>
  <tr><td>Lymph nodes</td><td>1 of 24 nodes positive (level II), no extranodal extension</td></tr>
  <tr><td>Stage</td><td><b>pT2 N1</b></td></tr></tbody></table>
  <h4>Impression</h4><p>Completely excised tongue cancer with one involved neck node. Adjuvant radiotherapy recommended by tumour board.</p>
  <div class="signrow">${STAMP('PATHOLOGY')}${SIG('Dr. N. Kaur', 'MD Pathology · Consultant Pathologist')}</div>`);
}

function paperD3() {
  return page('D3', `${nrciHead('Department of Radiation Oncology', 'RADIOTHERAPY COMPLETION SUMMARY')}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Reg. No', PT.reg]], [['Consultant', 'Dr. M. Bedi (Radiation Oncology)'], ['Date', paperDate(D.d3)]]])}
  <p><b>Treatment:</b> IMRT to tongue and right neck, 60 Gy in 30 fractions, ${paperDate(D.rtStart)} to ${paperDate(D.d3)}. Completed as planned.</p>
  <h4>Medicines</h4>
  ${rxTable([['Benzydamine 0.15% mouthwash 15 ml gargle', '1-1-1', '30 days'], ['Lignocaine 2% viscous 5 ml', 'before meals', 'SOS for mouth pain'], ['Tab Fluconazole 150 mg', '1-0-0', '7 days'], ['Sodium fluoride 1.1% gel', 'apply at bedtime', 'long term'], ['Protein supplement powder 2 scoops', '1-0-1', '—'], ['Tab Pantoprazole 40 mg', '1-0-0 before breakfast', '30 days']])}
  <div class="two"><div><h4>Follow-up</h4><ul><li>Radiation Oncology OPD after 8 weeks.</li><li>PET-CT scan after 12 weeks.</li><li>Dental review in 1 month.</li><li>Thyroid test (TSH) every 6 months.</li></ul></div>
  <div><h4>Care at home</h4><ul><li>Jaw-opening exercises 3 times a day, 20 times each.</li><li>Swallowing exercises as taught.</li><li>Moisturise the treated neck skin; avoid direct sun.</li><li>Brush with a soft brush after meals.</li></ul></div></div>
  <h4>Diet</h4><p>Soft, high-protein diet in small frequent meals. Avoid hot and spicy food. Weigh yourself every week.</p>
  <div class="warnbox"><b>Warning signs:</b> bleeding from mouth, fever above 101 F, unable to swallow liquids, new swelling in the neck, weight loss over 2 kg in a week.</div>
  <p class="small">Radiation Oncology OPD (Tue, Fri) 0172-000-1002 (fictional).</p>
  <div class="signrow">${STAMP('RADIATION ONC')}${SIG('Dr. M. Bedi', 'MD Radiation Oncology')}</div>`);
}

function paperD4() {
  return page('D4', `<div class="opd">${nrciHead('Head &amp; Neck Surgery OPD', 'OUT-PATIENT PRESCRIPTION', `Date: ${paperDate(D.d4)}`)}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Age / Sex', PT.ageSex]], [['Reg. No', PT.reg], ['OPD token', '47']]])}
  <div class="vitals">BP 128/80 · Pulse 82 · Wt 61 kg</div>
  <p class="hand">Review: Healing well. Complains of dry mouth.</p>
  <div class="rx">℞</div>
  <ol class="hand rxl">
    <li>Stop Pantoprazole.</li>
    <li>Tab Pilocarpine 5 mg &nbsp; 1-1-1 &nbsp; x 30 days (for dry mouth)</li>
    <li>Continue fluoride gel at bedtime.</li>
    <li>Tab Paracetamol 650 mg &nbsp; SOS for pain</li>
  </ol>
  <p class="hand">Investigations: CBC, KFT, TSH (sample given today).</p>
  <p class="hand"><b>Review after 4 weeks.</b></p>
  <div class="signrow">${STAMP('OPD')}${SIG('Dr. S. Arora', 'Head &amp; Neck Surgery')}</div></div>`);
}

function paperD5() {
  const rows = [['Haemoglobin', '12.1', 'L', 'g/dL', '13.0 - 17.0'], ['Total WBC count', '6,800', '', '/cumm', '4,000 - 11,000'], ['Platelet count', '2.4', '', 'lakh/cumm', '1.5 - 4.5'], ['Serum creatinine', '0.9', '', 'mg/dL', '0.7 - 1.3'], ['Blood urea', '28', '', 'mg/dL', '15 - 40'], ['TSH', '3.1', '', 'uIU/mL', '0.4 - 4.0']];
  return page('D5', `<header class="lh lab"><svg class="logo" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#5B2A86"/><path d="M24 12h16M28 12v14l-10 20a5 5 0 0 0 5 7h18a5 5 0 0 0 5-7L36 26V12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 42h20" stroke="#F9C80E" stroke-width="4"/></svg>
    <div class="lh-t"><div class="lh-n" style="color:#5B2A86">CITYCARE DIAGNOSTICS</div><div class="lh-s">A fictional laboratory for product demonstration · SCO 0, Sector 0, Chandigarh · Ph 0172-000-2000</div></div></header>
  <div class="band lab"><span>Haematology &amp; Biochemistry</span><b>LABORATORY REPORT</b><span>Lab ID: CC-88123</span></div>
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Age / Sex', PT.ageSex]], [['Ref', PT.reg], ['Referred by', 'Dr. S. Arora, NRCI']], [['Collected', paperDate(D.d5)], ['Reported', paperDate(D.d5)]]])}
  <table class="grid lab"><thead><tr><th>Test</th><th>Result</th><th>Flag</th><th>Unit</th><th>Reference</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td><td class="flag">${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('')}</tbody></table>
  <p><b>Remarks:</b> Mild anaemia. Kidney function and thyroid within normal limits.</p>
  <p class="small">*** End of report ***</p>
  <div class="signrow">${SIG('Dr. P. Mehta', 'MD Pathology · Lab Director')}</div>`);
}

function billTable(rows, total) {
  return `<table class="grid bill"><thead><tr><th>#</th><th>Particulars</th><th class="num">Amount (Rs)</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r[0]}</td><td class="num">${r[1]}</td></tr>`).join('')}<tr class="tot"><td></td><td>TOTAL</td><td class="num">Rs ${total}</td></tr></tbody></table>`;
}

function paperD6() {
  return page('D6', `${nrciHead('Billing Department', 'FINAL BILL - INPATIENT', `Bill No: NRCI/IP/2026/0412`)}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Reg. No', PT.reg]], [['Bill date', paperDate(D.d1)], ['Stay', `${paperDate(D.surgeryAdmit)} to ${paperDate(D.d1)}`]], [['Payer', 'HealthSure Insurance (fictional)'], ['Claim ref', 'HS-CLM-77821']]])}
  ${billTable([['Room and nursing', '38,000'], ['Operation theatre and surgeon', '96,500'], ['Medicines and consumables', '31,000'], ['Investigations', '19,000']], '1,84,500')}
  <table class="grid sum"><tbody><tr><td>Cashless approved</td><td class="num">Rs 1,50,000</td></tr><tr><td><b>Paid by patient</b></td><td class="num"><b>Rs 34,500</b></td></tr></tbody></table>
  <p class="small">Amount in words: Rupees One Lakh Eighty-Four Thousand Five Hundred only. Mode: Cashless + UPI.</p>
  <div class="signrow">${STAMP('BILLING')}${SIG('Accounts Officer', 'Billing Department')}</div>`);
}

function paperD7() {
  return page('D7', `${nrciHead('Department of Radiation Oncology', 'BILL / RECEIPT', `Bill No: NRCI/RT/2026/1187`)}
  ${ptGrid([[['Patient', `<b>${PT.name}</b>`], ['Reg. No', PT.reg]], [['Date', paperDate(D.d3)], ['Mode', 'Card']]])}
  ${billTable([['IMRT planning and 30 fractions', '92,000']], '92,000')}
  <div class="note">Paid by patient. Reimbursement claim to be filed with insurer within 30 days.</div>
  <div class="signrow">${STAMP('BILLING')}${SIG('Cashier', 'Radiation Oncology Billing')}</div>`);
}

function receipt(shop, sub, date, no, items, total) {
  return `<div class="rcpt"><div class="rc-h"><b>${shop}</b><div>${sub}</div><div>GSTIN: DEMO000000000 · DL No: DEMO-00</div></div>
  <div class="rc-m"><span>Bill: ${no}</span><span>${date}</span></div><div class="rc-m"><span>Pt: ${PT.name}</span><span>Dr: S. Arora</span></div>
  <table>${items.map((i) => `<tr><td>${i[0]}</td><td class="num">${i[1]}</td></tr>`).join('')}</table>
  <div class="rc-t"><span>NET AMOUNT</span><span>Rs ${total}</span></div><div class="rc-f">Thank you · Get well soon<br>(fictional pharmacy)</div></div>`;
}
function paperD8() {
  return page('D8', `<div class="band plain"><b>PHARMACY RECEIPTS (3)</b><span>Patient: ${PT.name} · ${PT.reg}</span></div>
  <div class="rcpts">
  ${receipt('NRCI HOSPITAL PHARMACY', 'Ground floor, NRCI (fictional)', paperDate(D.d8a), 'HP/1180', [['Amoxyclav 625 x10', '420'], ['Paracetamol 650 x15', '45'], ['Pantoprazole 40 x14', '210'], ['Chlorhexidine 0.2% 150ml', '125'], ['Dressing kit', '380']], '1,180')}
  ${receipt('NRCI HOSPITAL PHARMACY', 'Ground floor, NRCI (fictional)', paperDate(D.d8b), 'HP/2264', [['Benzydamine 0.15% 100ml', '165'], ['Lignocaine 2% viscous', '110'], ['Fluconazole 150 x7', '85'], ['Sodium fluoride 1.1% gel', '240'], ['Protein powder 400g', '860']], '1,460')}
  ${receipt('SHARMA MEDICOS', 'Main Bazaar (fictional)', paperDate(D.d8c), 'SM/0071', [['Pilocarpine 5mg x10', '210'], ['Pilocarpine 5mg x10', '210'], ['Paracetamol 650 x15', '45'], ['Misc', '135']], '600')}
  </div>
  <div class="note" style="margin-top:14px"><b>Total paid: Rs 3,240</b> (Receipt 1 Rs 1,180 + Receipt 2 Rs 1,460 + Receipt 3 Rs 600)</div>`);
}

const PAPERS = [paperD1, paperD2, paperD3, paperD4, paperD5, paperD6, paperD7, paperD8];
function renderPapers(only) {
  const list = only ? PAPERS.filter((f) => f.name === 'paper' + only) : PAPERS;
  return list.map((f) => f()).join('');
}
