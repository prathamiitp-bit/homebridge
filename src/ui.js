// ============================================================
// HomeBridge — screens S0–S15 (plain JavaScript, no build step)
// ============================================================

const I18N = {
  en: {
    tag: 'Concept for Tata 1mg', lang: 'हिंदी', start: 'Start with the sample folder', own: 'Use my own papers',
    heroT: 'Every paper from the hospital, turned into one plan you can follow.',
    heroB: 'Upload the discharge summary, reports, prescriptions and bills. HomeBridge reads them all, keeps one current plan, and reminds you what to do next.',
    how1: 'Add every paper', how1b: 'Photos or PDFs, any order, any hospital', how2: 'AI builds one plan', how2b: 'Medicines, visits, tests, diet, bills — each line linked to its page', how3: 'Stay on track', how3b: 'Reminders, refills at the cheapest same salt, visit prep',
    demo: 'Demo with a fictional patient. Please don’t upload real medical records. HomeBridge organises; your doctor and pharmacist decide.',
    s1T: 'Whose recovery are we planning?', s1S: 'Pick the condition, or let the AI detect it from the discharge summary.', detect: 'Detect from my papers', detectB: 'The AI reads the discharge summary and suggests a checklist',
    dDis: 'Discharge date', dEnd: 'Treatment end date (if any)', cont: 'Continue', back: 'Back',
    s2T: 'Add the papers', s2S: 'Add photos or PDFs of everything: discharge summary, reports, prescriptions, bills. Any order.', choose: 'Choose photos or PDFs', chooseB: 'JPG, PNG or PDF · up to 15 files · 8 MB each', useSample: 'Use the sample folder (8 papers)', read: 'Read my papers',
    s3T: 'Reading your papers', st1: 'Reading every page', st2: 'Sorting documents by type and date', st3: 'Pulling out medicines, visits, tests and advice', st4: 'Matching medicines to salts', st5: 'Building one plan (newest paper wins)',
    skip: 'Skip — use the saved answer key', liveOn: 'Live AI', keyOn: 'Saved answer key',
    s4T: 'Checklist and gaps', s4S: 'What a folder like yours usually holds, and what the papers don’t say.', docsH: 'Documents', itemsH: 'Plan items', conflictsH: 'Conflicts resolved',
    found: 'Found', notFound: 'Not in your papers', notYet: 'Not yet due', addQ: 'Add to visit questions', added: 'Added', toPlan: 'Open my plan',
    today: 'Today', meds: 'Medicines', visits: 'Visits', tests: 'Tests & reports', diet: 'Diet', care: 'Self-care', warn: 'Warning signs', bills: 'Bills', team: 'Care team', treat: 'Treatment', record: 'Record',
    morning: 'Morning', afternoon: 'Afternoon', night: 'Night', nextVisit: 'Next visit', nextTest: 'Next test', needsYou: 'Needs your attention', exercises: 'Exercises today',
    NEW: 'New', ACTIVE: 'Active', CHANGED: 'Changed', STOPPED: 'Stopped', COMPLETE: 'Course complete', ASK_DOCTOR: 'Ask doctor',
    sos: 'Only when needed', longTerm: 'Long term', daysLeft: 'days left', fromPaper: 'From', atHome: 'At home',
    navHome: 'Plan', navVault: 'Vault', navAsk: 'Ask', navBuy: 'Buy', navMore: 'More',
    s10T: 'Medicine box and cart', s10S: 'Tell us what is already at home. You buy only what is missing for the next 30 days.', boxH: 'In the medicine box', buyH: 'To buy', sosH: 'Only when needed (buy if you run out)', removeH: 'Take out of the box', holdH: 'On hold — ask the doctor first', order: 'Place order (demo)', illus: 'Prices are illustrative. Every order is checked by a pharmacist.',
    s11T: 'Reminders', s11S: 'Built from the papers. Choose who gets them.', patientR: 'Patient (Hindi)', caregiverR: 'Caregiver (English)', ics: 'Add all to my calendar (.ics)', waPrev: 'See WhatsApp preview',
    s12T: 'Ask your documents', s12S: 'Answers come only from your papers, with the page cited.', askPh: 'Ask about your papers…', notIn: 'That is not in your papers. Add it to your visit questions?', adviceNo: 'That is a decision for the doctor. I have added it to your visit questions.',
    s13T: 'Visit prep', s13S: 'A one-page summary to show the doctor, and the questions to ask.', copy: 'Copy', download: 'Download', copied: 'Copied',
    s14T: 'Document vault', s14S: 'Every paper, kept in one place, labelled by type and date.', searchPh: 'Search: drug, test, doctor, bill…', all: 'All', sharePack: 'Share selected as one pack',
    s15T: 'WhatsApp updates', s15S: 'What the family receives. Tap “Open in WhatsApp” on any message to send it yourself.', openWa: 'Open in WhatsApp',
    more: 'More', addPapers: 'Add more papers', startOver: 'Start over', emergency: 'Emergency: call 112',
    simple: 'Simple view', simpleOn: 'Simple view on', forWhat: 'For', looks: 'Looks like', matchStrip: 'Check it matches the strip', rulesT: 'How HomeBridge decides',
    s_NEW: 'New medicine', s_ACTIVE: 'Keep giving', s_CHANGED: 'Dose changed', s_STOPPED: 'Stop, don’t give', s_COMPLETE: 'Finished', s_ASK_DOCTOR: 'Ask doctor first', taken: 'taken today',
  },
  hi: {
    tag: 'Tata 1mg के लिए कॉन्सेप्ट', lang: 'English', start: 'सैंपल फ़ोल्डर से शुरू करें', own: 'अपने कागज़ इस्तेमाल करें',
    heroT: 'अस्पताल का हर कागज़, एक ऐसी योजना में जिसे आप फॉलो कर सकें।',
    heroB: 'डिस्चार्ज सारांश, रिपोर्ट, पर्चे और बिल अपलोड करें। HomeBridge सब पढ़कर एक ताज़ा योजना रखता है और याद दिलाता है कि आगे क्या करना है।',
    how1: 'हर कागज़ जोड़ें', how1b: 'फोटो या PDF, किसी भी क्रम में', how2: 'AI एक योजना बनाता है', how2b: 'दवाएं, विज़िट, जांच, खाना, बिल — हर लाइन अपने पेज से जुड़ी', how3: 'ट्रैक पर रहें', how3b: 'रिमाइंडर, सबसे सस्ती वही दवा, विज़िट की तैयारी',
    demo: 'काल्पनिक मरीज़ के साथ डेमो। असली मेडिकल रिकॉर्ड अपलोड न करें। HomeBridge व्यवस्थित करता है; फैसला डॉक्टर और फार्मासिस्ट का है।',
    s1T: 'किसकी रिकवरी की योजना बना रहे हैं?', s1S: 'बीमारी चुनें, या AI को डिस्चार्ज सारांश से पहचानने दें।', detect: 'मेरे कागज़ों से पहचानें', detectB: 'AI डिस्चार्ज सारांश पढ़कर चेकलिस्ट सुझाता है',
    dDis: 'डिस्चार्ज की तारीख', dEnd: 'इलाज खत्म होने की तारीख', cont: 'आगे', back: 'पीछे',
    s2T: 'कागज़ जोड़ें', s2S: 'हर कागज़ की फोटो या PDF जोड़ें: डिस्चार्ज सारांश, रिपोर्ट, पर्चे, बिल।', choose: 'फोटो या PDF चुनें', chooseB: 'JPG, PNG या PDF · 15 फ़ाइल तक', useSample: 'सैंपल फ़ोल्डर लें (8 कागज़)', read: 'मेरे कागज़ पढ़ें',
    s3T: 'आपके कागज़ पढ़ रहे हैं', st1: 'हर पेज पढ़ रहे हैं', st2: 'कागज़ों को प्रकार और तारीख से छांट रहे हैं', st3: 'दवाएं, विज़िट, जांच और सलाह निकाल रहे हैं', st4: 'दवाओं को सॉल्ट से मिला रहे हैं', st5: 'एक योजना बना रहे हैं (नया पर्चा मान्य)',
    skip: 'छोड़ें — सेव की गई उत्तर-कुंजी लें', liveOn: 'लाइव AI', keyOn: 'सेव उत्तर-कुंजी',
    s4T: 'चेकलिस्ट और कमियां', s4S: 'ऐसे फ़ोल्डर में आमतौर पर क्या होता है, और कागज़ों में क्या नहीं लिखा।', docsH: 'कागज़', itemsH: 'योजना की बातें', conflictsH: 'सुलझाए गए टकराव',
    found: 'मिला', notFound: 'कागज़ों में नहीं', notYet: 'अभी समय नहीं', addQ: 'डॉक्टर से पूछने की सूची में डालें', added: 'जोड़ा गया', toPlan: 'मेरी योजना खोलें',
    today: 'आज', meds: 'दवाएं', visits: 'विज़िट', tests: 'जांच और रिपोर्ट', diet: 'खाना', care: 'देखभाल', warn: 'चेतावनी', bills: 'बिल', team: 'डॉक्टर टीम', treat: 'इलाज', record: 'रिकॉर्ड',
    morning: 'सुबह', afternoon: 'दोपहर', night: 'रात', nextVisit: 'अगली विज़िट', nextTest: 'अगली जांच', needsYou: 'ध्यान दें', exercises: 'आज की कसरत',
    NEW: 'नई', ACTIVE: 'चालू', CHANGED: 'बदली', STOPPED: 'बंद', COMPLETE: 'कोर्स पूरा', ASK_DOCTOR: 'डॉक्टर से पूछें',
    sos: 'ज़रूरत पर ही', longTerm: 'लंबे समय तक', daysLeft: 'दिन बाकी', fromPaper: 'स्रोत', atHome: 'घर पर',
    navHome: 'योजना', navVault: 'कागज़', navAsk: 'पूछें', navBuy: 'खरीदें', navMore: 'और',
    s10T: 'दवा का डिब्बा और कार्ट', s10S: 'बताएं घर पर क्या है। अगले 30 दिन के लिए सिर्फ कमी वाली दवा खरीदें।', boxH: 'डिब्बे में', buyH: 'खरीदना है', sosH: 'ज़रूरत पर ही (खत्म हो तो लें)', removeH: 'डिब्बे से निकालें', holdH: 'रोकें — पहले डॉक्टर से पूछें', order: 'ऑर्डर करें (डेमो)', illus: 'कीमतें उदाहरण हैं। हर ऑर्डर फार्मासिस्ट जांचता है।',
    s11T: 'रिमाइंडर', s11S: 'कागज़ों से बने। चुनें किसे मिलें।', patientR: 'मरीज़ (हिंदी)', caregiverR: 'देखभाल करने वाला (अंग्रेज़ी)', ics: 'सब कैलेंडर में जोड़ें (.ics)', waPrev: 'WhatsApp झलक देखें',
    s12T: 'अपने कागज़ों से पूछें', s12S: 'जवाब सिर्फ आपके कागज़ों से, पेज के हवाले के साथ।', askPh: 'अपने कागज़ों के बारे में पूछें…', notIn: 'यह आपके कागज़ों में नहीं है। डॉक्टर से पूछने की सूची में जोड़ें?', adviceNo: 'यह डॉक्टर का फैसला है। मैंने इसे पूछने की सूची में जोड़ दिया है।',
    s13T: 'विज़िट की तैयारी', s13S: 'डॉक्टर को दिखाने के लिए एक पेज का सारांश और पूछने के सवाल।', copy: 'कॉपी', download: 'डाउनलोड', copied: 'कॉपी हुआ',
    s14T: 'कागज़ों की तिजोरी', s14S: 'हर कागज़ एक जगह, प्रकार और तारीख के साथ।', searchPh: 'खोजें: दवा, जांच, डॉक्टर, बिल…', all: 'सब', sharePack: 'चुने हुए एक साथ भेजें',
    s15T: 'WhatsApp अपडेट', s15S: 'परिवार को क्या मिलेगा। किसी भी संदेश पर “WhatsApp में खोलें” दबाकर भेजें।', openWa: 'WhatsApp में खोलें',
    more: 'और', addPapers: 'और कागज़ जोड़ें', startOver: 'फिर से शुरू करें', emergency: 'इमरजेंसी: 112 पर कॉल करें',
    simple: 'आसान व्यू', simpleOn: 'आसान व्यू चालू', forWhat: 'किसलिए', looks: 'दिखने में', matchStrip: 'पत्ते से मिलाकर देखें', rulesT: 'HomeBridge कैसे तय करता है',
    s_NEW: 'नई दवा', s_ACTIVE: 'देते रहें', s_CHANGED: 'खुराक बदली', s_STOPPED: 'बंद करें, न दें', s_COMPLETE: 'पूरी हो गई', s_ASK_DOCTOR: 'पहले डॉक्टर से पूछें', taken: 'आज ली गईं',
  },
};
const STATUS_TONE = { NEW: 't-new', ACTIVE: 't-active', CHANGED: 't-changed', STOPPED: 't-stopped', COMPLETE: 't-complete', ASK_DOCTOR: 't-ask' };

const S = {
  screen: 'landing', lang: 'en', condition: 'auto', dates: { discharge: '', treatEnd: '' }, docs: [], extractions: {}, sourceOf: {},
  plan: null, keyPlan: null, golden: null, home: [], tab: 'today', pick: {}, ticks: {}, exTicks: {}, chat: [], reminderFor: { patient: true, caregiver: true },
  simple: false, visitQs: [], sheet: null, toast: null, proc: null, useLive: true, index: null, vaultQ: '', vaultType: 'all', vaultSel: {}, isSample: false, srcReg: [], scroll: {},
};
const t = (k) => (I18N[S.lang][k] ?? I18N.en[k] ?? k);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = (en, hi) => (S.lang === 'hi' && hi ? hi : en);
const docOf = (id) => S.docs.find((d) => d.id === id);

function srcBtn(doc, quote, label) {
  if (!doc || doc === 'HOME') return `<span class="src" style="color:var(--ink3)">${esc(L('From your medicine box', 'आपके दवा के डिब्बे से'))}</span>`;
  const i = S.srcReg.push({ doc, quote }) - 1;
  const d = docOf(doc);
  if (S.simple) return `<button class="src" data-a="src" data-i="${i}">📄 ${esc(L('See the paper', 'कागज़ देखें'))}</button>`;
  return `<button class="src" data-a="src" data-i="${i}">↗ ${t('fromPaper')} <code>${esc(doc)}</code> ${esc(label || (d ? d.title : ''))}</button>`;
}
const statusTag = (s) => `<span class="tag ${STATUS_TONE[s] || 't-complete'}">${esc(t(S.simple ? 's_' + s : s))}</span>`;
function medInfo(m) {
  if (!m) return null;
  if (MED_INFO[m.salt]) return MED_INFO[m.salt];
  const k = Object.keys(MED_INFO).find((x) => saltKey(x) === m.key || norm(m.name || '').includes(norm(x)));
  return k ? MED_INFO[k] : null;
}
function pillSvg(look, size = 34) {
  const c = (look && look.color) || '#EDEFF3', st = '#1D2433', sh = (look && look.shape) || 'round', hl = 'rgba(255,255,255,.55)';
  const inner = {
    round: `<circle cx="20" cy="20" r="11" fill="${c}" stroke="${st}" stroke-width="1.6"/><path d="M12.5 20h15" stroke="${st}" stroke-opacity=".35" stroke-width="1.2"/><ellipse cx="16" cy="15.5" rx="3" ry="1.6" fill="${hl}"/>`,
    oval: `<ellipse cx="20" cy="20" rx="14" ry="9" fill="${c}" stroke="${st}" stroke-width="1.6"/><path d="M8 20h24" stroke="${st}" stroke-opacity=".3" stroke-width="1.2"/><ellipse cx="14" cy="16" rx="4" ry="1.6" fill="${hl}"/>`,
    long: `<rect x="4" y="13" width="32" height="14" rx="7" fill="${c}" stroke="${st}" stroke-width="1.6"/><path d="M20 13v14" stroke="${st}" stroke-opacity=".35" stroke-width="1.2"/><rect x="8" y="15.5" width="9" height="2.4" rx="1.2" fill="${hl}"/>`,
    capsule: `<rect x="4" y="13" width="32" height="14" rx="7" fill="#fff" stroke="${st}" stroke-width="1.6"/><path d="M11 13h9v14h-9a7 7 0 0 1 0-14z" fill="${c}"/><path d="M20 13v14" stroke="${st}" stroke-width="1.2"/><rect x="8" y="15.5" width="7" height="2.4" rx="1.2" fill="${hl}"/>`,
    bottle: `<rect x="15" y="4" width="10" height="6" rx="2" fill="#fff" stroke="${st}" stroke-width="1.5"/><path d="M12 13a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v21a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" fill="#fff" stroke="${st}" stroke-width="1.6"/><path d="M13 20h14v13a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 13 33z" fill="${c}"/><rect x="15" y="22" width="3" height="8" rx="1.5" fill="${hl}"/>`,
    tube: `<path d="M8 15h20l6 5-6 5H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" fill="${c}" stroke="${st}" stroke-width="1.6"/><rect x="2" y="16.5" width="4" height="7" rx="1" fill="#fff" stroke="${st}" stroke-width="1.4"/><rect x="10" y="17" width="10" height="2" rx="1" fill="${hl}"/>`,
    tin: `<ellipse cx="20" cy="11" rx="12" ry="4" fill="#fff" stroke="${st}" stroke-width="1.6"/><path d="M8 11v18c0 2.2 5.4 4 12 4s12-1.8 12-4V11" fill="${c}" stroke="${st}" stroke-width="1.6"/><rect x="11" y="17" width="3" height="10" rx="1.5" fill="${hl}"/>`,
  }[sh] || '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true" class="pill">${inner}</svg>`;
}

// ---------------- Rail (desktop explainer) ----------------
function renderRail() {
  const live = AI.live;
  return `<div class="concept">Concept prototype for Tata 1mg</div>
  <h1>HomeBridge</h1>
  <p>An AI recovery hub for any diagnosis or treatment. Families upload every paper from the hospital; HomeBridge keeps one reconciled plan and helps them act on it for months after discharge.</p>
  <div class="aimode"><span class="dot ${live ? 'live' : ''}"></span><div><b>AI mode: ${esc(AI.mode === 'checking' ? 'checking…' : AI.label)}</b><br><span class="muted small">${live ? 'Papers are read live; the sample can be checked against its answer key.' : 'Live AI is not available in this view, so the sample uses its saved answer key.'}</span></div></div>
  <h2>How the AI works</h2>
  <ol class="pipe">
    <li class="ai"><b>1 · Read and sort</b>A vision model reads each photo or PDF and labels it: discharge summary, report, prescription, bill.</li>
    <li class="ai"><b>2 · Extract</b>The model fills a fixed JSON schema. Every item must carry a word-for-word quote from the page.</li>
    <li><b>3 · Normalise (code)</b>Brand names map to salts through the catalogue; “after 12 weeks” becomes a date.</li>
    <li><b>4 · Reconcile (code)</b>Rules, not the model, decide status: the newest paper wins, nothing is stopped without a written instruction.</li>
    <li><b>5 · Find gaps (code)</b>The plan is compared with the condition’s checklist; missing items become questions for the doctor.</li>
    <li class="ai"><b>6 · Answer (RAG)</b>Questions are matched to the family’s own pages (keyword + synonym search), and the model answers only from them, citing the page.</li>
  </ol>
  <p style="margin-top:10px"><button class="btn btn-sm btn-soft" data-a="go" data-to="rules" ${S.plan ? '' : 'disabled'}>⚖️ Knowledge bases, rule order and weights</button></p>
  <h2>Safety rules</h2>
  <ol class="pipe"><li>Every line links to the page it came from.</li><li>Unclear items go to “Ask doctor”, never guessed.</li><li>No diagnosis, dose change or advice.</li><li>Nothing is stored after the session.</li></ol>
  <p class="foot">All data is synthetic: patient, hospital, doctors and prices are fictional. Not an official Tata 1mg product.</p>`;
}

// ---------------- Screens ----------------
function scrLanding() {
  return `<div class="screen fade">
    <div class="hero"><svg class="hero-art" viewBox="0 0 320 120" aria-hidden="true"><g transform="rotate(-8 60 60)"><rect x="18" y="18" width="78" height="96" rx="8" fill="#fff" stroke="#F3C9C2"/><rect x="28" y="30" width="44" height="6" rx="3" fill="#FF6F61"/><rect x="28" y="46" width="56" height="4" rx="2" fill="#E8E2DC"/><rect x="28" y="56" width="48" height="4" rx="2" fill="#E8E2DC"/><rect x="28" y="66" width="52" height="4" rx="2" fill="#E8E2DC"/></g><rect x="40" y="10" width="78" height="96" rx="8" fill="#fff" stroke="#F3C9C2"/><rect x="50" y="22" width="40" height="6" rx="3" fill="#1D2433"/><rect x="50" y="38" width="56" height="4" rx="2" fill="#E8E2DC"/><rect x="50" y="48" width="50" height="4" rx="2" fill="#E8E2DC"/><rect x="50" y="58" width="54" height="4" rx="2" fill="#E8E2DC"/><rect x="50" y="76" width="34" height="14" rx="7" fill="#FFE6A8"/><path d="M134 58h40" stroke="#FF6F61" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7"/><path d="M170 50l10 8-10 8" fill="none" stroke="#FF6F61" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="194" y="6" width="112" height="108" rx="16" fill="#1D2433"/><text x="208" y="28" fill="#fff" font-size="11" font-weight="700" font-family="Inter,sans-serif">Today</text><rect x="206" y="38" width="88" height="18" rx="6" fill="rgba(255,255,255,.1)"/><circle cx="216" cy="47" r="5" fill="#fff"/><rect x="226" y="44" width="50" height="5" rx="2.5" fill="#B9C0CF"/><rect x="206" y="62" width="88" height="18" rx="6" fill="rgba(255,255,255,.1)"/><rect x="211" y="43" width="0" height="0"/><rect x="209" y="67" width="14" height="8" rx="4" fill="#F5C842"/><rect x="226" y="68" width="44" height="5" rx="2.5" fill="#B9C0CF"/><rect x="206" y="86" width="88" height="18" rx="6" fill="rgba(255,255,255,.1)"/><rect x="211" y="89" width="8" height="12" rx="2" fill="#3BAA6B"/><rect x="226" y="92" width="56" height="5" rx="2.5" fill="#B9C0CF"/></svg><div class="h1">${esc(t('heroT'))}</div><p class="sub" style="margin:0">${esc(t('heroB'))}</p></div>
    <ol class="steps">
      <li><span class="n">1</span><div><b>${esc(t('how1'))}</b><div class="muted small">${esc(t('how1b'))}</div></div></li>
      <li><span class="n">2</span><div><b>${esc(t('how2'))}</b><div class="muted small">${esc(t('how2b'))}</div></div></li>
      <li><span class="n">3</span><div><b>${esc(t('how3'))}</b><div class="muted small">${esc(t('how3b'))}</div></div></li>
    </ol>
    <div class="stack" style="margin:16px 0"><button class="btn btn-p btn-block" data-a="sample">✦ ${esc(t('start'))}</button><button class="btn btn-s btn-block" data-a="go" data-to="condition">${esc(t('own'))}</button></div>
    <div class="banner">🛡️ <span>${esc(t('demo'))}</span></div>
  </div>`;
}

function scrCondition() {
  const opts = [['auto', '🔎', t('detect'), t('detectB')], ...Object.entries(JOURNEYS).map(([k, j]) => [k, k === 'head_neck_cancer' ? '🎗️' : k === 'heart_attack' ? '❤️' : '🏥', L(j.name.en, j.name.hi), `${j.items.length} ${L('checklist items', 'चेकलिस्ट बातें')}`])];
  return `<div class="screen fade"><div class="h1">${esc(t('s1T'))}</div><p class="sub">${esc(t('s1S'))}</p>
    ${opts.map(([k, ic, name, sub]) => `<button class="opt ${S.condition === k ? 'on' : ''}" data-a="cond" data-k="${k}"><span class="ic">${ic}</span><span><b>${esc(name)}</b><br><span class="muted small">${esc(sub)}</span></span></button>`).join('')}
    <div class="card" style="margin-top:8px"><div class="field"><label>${esc(t('dDis'))}</label><input type="date" data-in="dDis" value="${esc(S.dates.discharge)}"></div>
    <div class="field" style="margin:0"><label>${esc(t('dEnd'))}</label><input type="date" data-in="dEnd" value="${esc(S.dates.treatEnd)}"></div></div>
  </div><div class="dock"><button class="btn btn-s" data-a="go" data-to="landing">${esc(t('back'))}</button><button class="btn btn-p grow" data-a="go" data-to="upload">${esc(t('cont'))}</button></div>`;
}

function scrUpload() {
  const fresh = S.docs.filter((d) => !S.extractions[d.id]);
  return `<div class="screen fade"><div class="h1">${esc(t('s2T'))}</div><p class="sub">${esc(t('s2S'))}</p>
    <label class="btn btn-p btn-block cam"><input type="file" id="file2" accept="image/*" capture="environment" hidden>📷 ${esc(L('Take a photo of a paper', 'कागज़ की फोटो खींचें'))}</label>
    <label class="drop"><input type="file" id="file" accept="image/*,application/pdf,.txt" multiple hidden><div style="font-size:30px">📄</div><b>${esc(t('choose'))}</b><span class="muted small">${esc(t('chooseB'))}</span></label>
    ${S.docs.length ? `<div class="files">${S.docs.map((d) => `<div class="fthumb">${d.thumb ? `<img src="${d.thumb}" alt="">` : '<div class="paper-mini"></div>'}<b>${esc(d.id)}</b><span>${esc(d.title)}</span>${S.extractions[d.id] ? '' : `<button class="x" data-a="rmdoc" data-id="${d.id}" aria-label="Remove">✕</button>`}</div>`).join('')}</div>` : ''}
    ${S.docs.length ? '' : `<button class="btn btn-soft btn-block" style="margin-top:12px" data-a="loadSample">${esc(t('useSample'))}</button>`}
    ${!AI.live && S.docs.some((d) => !d.sample && !S.extractions[d.id]) ? `<div class="banner" style="margin-top:12px">ℹ️ <span>${esc(L('Live AI is not available in this view, so your own files will be kept in the vault but not read. The sample folder works fully with its saved answer key.', 'इस व्यू में लाइव AI उपलब्ध नहीं है; आपकी फ़ाइलें तिजोरी में रहेंगी पर पढ़ी नहीं जाएंगी।'))}</span></div>` : ''}
    ${AI.live && S.docs.some((d) => d.sample) ? `<label class="row small" style="margin-top:12px"><input type="checkbox" data-in="useLive" ${S.useLive ? 'checked' : ''}> ${esc(L('Read the sample with live AI and check it against the answer key', 'सैंपल को लाइव AI से पढ़ें और उत्तर-कुंजी से मिलाएं'))}</label>` : ''}
  </div><div class="dock"><button class="btn btn-s" data-a="go" data-to="${S.plan ? 'plan' : 'condition'}">${esc(t('back'))}</button><button class="btn btn-p grow" data-a="process" ${fresh.length ? '' : 'disabled'}>${esc(t('read'))} (${fresh.length})</button></div>`;
}

function scrReading() {
  const p = S.proc || { step: 0, files: {} };
  const steps = ['st1', 'st2', 'st3', 'st4', 'st5'];
  return `<div class="screen fade"><div class="h1">${esc(t('s3T'))}</div>
    <p class="sub">${p.live ? `<span class="tag t-live">● ${esc(t('liveOn'))}: ${esc(AI.label)}</span>` : `<span class="tag t-key">${esc(t('keyOn'))}</span>`} <span class="muted small">${p.secs || 0}s</span></p>
    <div class="card"><ol class="progress">${steps.map((s, i) => `<li class="${i < p.step ? 'done' : i === p.step ? 'on' : ''}"><span class="tick">${i < p.step ? '✓' : ''}</span>${esc(t(s))}</li>`).join('')}</ol></div>
    <div class="doclist">${S.docs.map((d) => { const f = p.files[d.id] || {}; return `<div class="docrow"><span class="id">${esc(d.id)}</span><span class="grow">${esc(d.title)}${f.type ? `<br><span class="muted small">${esc(L(DOC_TYPE_LABEL[f.type]?.en || f.type, DOC_TYPE_LABEL[f.type]?.hi))} · ${esc(fmtDate(f.date, S.lang))}</span>` : ''}</span>${f.state === 'done' ? `<span class="tag ${f.src === 'live' ? 't-live' : 't-key'}">${f.src === 'live' ? '✓ AI' : '✓ key'}</span>` : f.state === 'err' ? '<span class="tag t-ask">!</span>' : f.state === 'skip' ? `<span class="tag t-complete">${esc(L('kept, not read', 'पढ़ा नहीं'))}</span>` : '<span class="spinner"></span>'}</div>`; }).join('')}</div>
    ${p.error ? `<div class="alert red" style="margin-top:12px">⚠️ <span>${esc(p.error)}</span></div>` : ''}
  </div>${p.live && !p.finished ? `<div class="dock"><button class="btn btn-s btn-block" data-a="skipLive">${esc(t('skip'))}</button></div>` : ''}`;
}

function scrChecklist() {
  const g = S.plan.gaps; const j = JOURNEYS[g.journey];
  const toneOf = (s) => (s === 'FOUND' ? 't-found' : s === 'NOT_YET' ? 't-yet' : 't-miss');
  const lab = (s) => (s === 'FOUND' ? t('found') : s === 'NOT_YET' ? t('notYet') : t('notFound'));
  return `<div class="screen fade"><div class="h1">${esc(t('s4T'))}</div><p class="sub">${esc(t('s4S'))}</p>
    ${S.golden ? `<div class="alert" style="background:var(--green-l);border-color:#BFE6CF">✅ <span>${esc(L(`${S.golden.printed ? 'These are the printed sample papers. ' : ''}Live AI matched the answer key on ${S.golden.match} of ${S.golden.total} medicine statuses.`, `लाइव AI ने ${S.golden.total} में से ${S.golden.match} दवाओं की स्थिति उत्तर-कुंजी जैसी बताई।`))}${S.golden.diffs.length ? ' ' + esc(S.golden.diffs.map((d) => `${d.name}: key ${d.key}, live ${d.live}`).join('; ')) : ''}</span></div>` : ''}
    <div class="card"><div class="row"><b class="grow">${esc(L(j.name.en, j.name.hi))}</b><button class="btn btn-sm btn-s" data-a="go" data-to="condition">${esc(L('Change', 'बदलें'))}</button></div><div class="muted small">${esc(L(S.condition === 'auto' ? 'Detected from your discharge summary' : 'Chosen by you', S.condition === 'auto' ? 'डिस्चार्ज सारांश से पहचाना' : 'आपने चुना'))}</div></div>
    <div class="group-h">${esc(t('docsH'))}</div><div class="card">${g.docs.map((d) => `<div class="li"><span class="grow">${esc(d.en)}</span><span class="tag ${toneOf(d.status)}">${esc(lab(d.status))}</span></div>`).join('')}</div>
    <div class="group-h">${esc(t('itemsH'))}</div><div class="card">${g.items.map((it) => `<div class="li"><div class="grow">${esc(L(it.en, it.hi))}${it.status === 'NOT_FOUND' ? `<div class="row" style="margin-top:6px"><button class="btn btn-sm btn-soft" data-a="addq" data-q="${esc(it.q)}">${S.visitQs.includes(it.q) ? '✓ ' + esc(t('added')) : '+ ' + esc(t('addQ'))}</button></div>` : ''}</div><span class="tag ${toneOf(it.status)}">${esc(lab(it.status))}</span></div>`).join('')}</div>
    ${g.conflicts.length ? `<div class="group-h">${esc(t('conflictsH'))}</div>${g.conflicts.map((m) => `<div class="card"><b>${esc(m.name)}</b> ${statusTag(m.status)}${m.notes.filter((n) => n.kind === 'conflict').map((n) => `<div class="note conflict">${esc(L(n.en, n.hi))}</div>`).join('')}${m.mentions.map((x) => srcBtn(x.doc, x.quote)).join('<br>')}</div>`).join('')}` : ''}
  </div><div class="dock"><button class="btn btn-p btn-block" data-a="go" data-to="plan">${esc(t('toPlan'))} →</button></div>`;
}

// ---------- S5–S9: dashboard and tabs ----------
const TABS = ['today', 'meds', 'visits', 'tests', 'diet', 'care', 'warn', 'bills', 'team', 'treat', 'record'];
const TAB_IC = { today: '☀️', meds: '💊', visits: '🩺', tests: '🧪', diet: '🥣', care: '💪', warn: '⚠️', bills: '🧾', team: '📞', treat: '🎗️', record: '🪪' };
function renderTabs() { return `<div class="tabs">${TABS.map((k) => `<button class="tab ${S.tab === k ? 'on' : ''}" data-a="tab" data-k="${k}"><span>${TAB_IC[k]}</span> ${esc(t(k))}</button>`).join('')}</div>`; }

function doseChips(m) {
  if (m.sos) return `<div class="dose"><span class="dchip on">${esc(t('sos'))}</span>${m.timing ? `<span class="dchip">${esc(m.timing)}</span>` : ''}</div>`;
  if (!m.dose_pattern) return '';
  const p = m.dose_pattern.split('-');
  return `<div class="dose">${SLOTS.map((s, i) => `<span class="dchip ${parseFloat(p[i]) > 0 ? 'on' : ''}">${esc(t(s))}${parseFloat(p[i]) > 1 ? ' ×' + p[i] : ''}</span>`).join('')}${m.timing ? `<span class="dchip">${esc(m.timing)}</span>` : ''}${m.long_term ? `<span class="dchip">${esc(t('longTerm'))}</span>` : ''}${m.daysLeft > 0 ? `<span class="dchip">${m.daysLeft} ${esc(t('daysLeft'))}</span>` : ''}</div>`;
}
function medCard(m) {
  const dim = m.status === 'STOPPED' || m.status === 'COMPLETE';
  const reason = {
    NEW: L(`Started on the newest prescription (${m.source.doc}).`, `नए पर्चे (${m.source.doc}) में शुरू की गई।`),
    ACTIVE: L('Keep giving as written.', 'जैसा लिखा है वैसे देते रहें।'),
    CHANGED: L(`Changed from ${m.prev?.strength || ''} ${m.prev?.dose_pattern || ''} on ${m.prev?.doc || ''}.`, 'खुराक बदली गई है।'),
    STOPPED: L('Do not give. Take it out of the medicine box.', 'न दें। दवा के डिब्बे से निकाल दें।'),
    COMPLETE: L(`Course finished on ${fmtDate(m.endDate, 'en')}.`, `कोर्स ${fmtDate(m.endDate, 'hi')} को पूरा हुआ।`),
    ASK_DOCTOR: L('Not on any paper. Ask before giving.', 'किसी कागज़ में नहीं। देने से पहले पूछें।'),
  }[m.status];
  const hist = m.mentions && m.mentions.length > 1 ? `<div class="muted small" style="margin-top:6px">${esc(L('History', 'इतिहास'))}: ${m.mentions.map((x) => `${x.doc} ${x.action}`).join(' → ')}</div>` : '';
  const info = medInfo(m);
  return `<div class="med ${dim ? 'dim' : ''} m-${m.status}"><div class="med-top"><span class="pillwrap">${pillSvg(info?.look, 40)}</span><div class="grow"><h4>${esc(m.name)}</h4>${info ? `<div class="purpose">${esc(L(info.purpose.en, info.purpose.hi))}</div>` : ''}<small class="tech">${esc([m.salt, m.form].filter(Boolean).join(' · '))}</small></div>${statusTag(m.status)}</div>
    ${info ? `<div class="looks">👁️ ${esc(t('looks'))}: <b>${esc(L(info.look.en, info.look.hi))}</b><span class="muted"> · ${esc(t('matchStrip'))}</span></div>` : ''}
    <div class="small" style="margin-top:6px">${esc(reason)}</div>${dim ? '' : doseChips(m)}
    ${m.notes.filter((n) => n.kind !== 'info').map((n) => `<div class="note ${n.kind}">${esc(L(n.en, n.hi))}</div>`).join('')}
    ${m.home ? `<div class="muted small" style="margin-top:6px">${esc(t('atHome'))}: ${esc(m.home.qty)} ${esc(m.home.unit)}</div>` : ''}<div class="tech">${hist}</div>
    ${srcBtn(m.source.doc, m.source.quote)}</div>`;
}

function tabToday() {
  const P = S.plan, td = buildToday(P);
  const attn = [];
  const ask = P.meds.filter((m) => m.status === 'ASK_DOCTOR' || m.needs_clarification);
  if (ask.length) attn.push(`<button class="alert" data-a="tab" data-k="meds">❓ <span><b>${ask.length} ${esc(L('medicines need a doctor’s answer', 'दवाओं पर डॉक्टर से पूछना है'))}</b><br>${esc(ask.map((m) => m.name).join(', '))}</span></button>`);
  const gaps = P.gaps.items.filter((i) => i.status === 'NOT_FOUND');
  if (gaps.length) attn.push(`<button class="alert" data-a="go" data-to="checklist">📋 <span><b>${gaps.length} ${esc(L('checklist items not in your papers', 'चेकलिस्ट बातें कागज़ों में नहीं'))}</b><br>${esc(gaps.map((g) => L(g.en, g.hi)).join(', '))}</span></button>`);
  const stop = P.meds.filter((m) => m.status === 'STOPPED' && m.home);
  if (stop.length) attn.push(`<button class="alert red" data-a="go" data-to="box">🚫 <span><b>${esc(L('Take out of the medicine box', 'डिब्बे से निकालें'))}</b><br>${esc(stop.map((m) => m.name).join(', '))}</span></button>`);
  const claim = P.bills.find((b) => b.claim_due && b.claim_due >= T_ISO);
  if (claim) attn.push(`<button class="alert" data-a="tab" data-k="bills">🧾 <span><b>${esc(L('Insurance claim due', 'बीमा क्लेम की आखिरी तारीख'))} ${esc(relDays(claim.claim_due, S.lang))}</b><br>${esc(claim.what)} · ₹${inr(claim.amount)}</span></button>`);
  const slotHtml = SLOTS.map((s) => td.slots[s].length ? `<div class="slot"><div class="when">${s === 'morning' ? '🌅' : s === 'afternoon' ? '☀️' : '🌙'} ${esc(t(s))}</div><div class="grow">${td.slots[s].map((m) => { const k = `${T_ISO}|${s}|${m.key}`; return `<button class="chk ${S.ticks[k] ? 'on' : ''}" data-a="tick" data-k="${k}"><span class="box">${S.ticks[k] ? '✓' : ''}</span>${pillSvg(medInfo(m)?.look, 30)}<span class="grow"><b>${esc(S.simple && medInfo(m) ? L(medInfo(m).kind.en, medInfo(m).kind.hi) : m.name)}</b><span class="muted small" style="display:block">${esc(S.simple ? (medInfo(m) ? L(medInfo(m).look.en, medInfo(m).look.hi) : '') : [medInfo(m) ? L(medInfo(m).purpose.en, medInfo(m).purpose.hi) : '', m.timing].filter(Boolean).join(' · '))}</span></span></button>`; }).join('')}</div></div>` : '').join('');
  const exs = P.exercises.filter((e) => e.freq_per_day);
  const totalDoses = SLOTS.reduce((n, s) => n + td.slots[s].length, 0);
  const doneDoses = SLOTS.reduce((n, s) => n + td.slots[s].filter((m) => S.ticks[`${T_ISO}|${s}|${m.key}`]).length, 0);
  const pct = totalDoses ? doneDoses / totalDoses : 0, C = 2 * Math.PI * 22;
  return `<div class="card today"><div class="row"><div class="grow"><b style="font-size:18px">${esc(t('today'))}</b><div class="muted small">${esc(fmtDate(T_ISO, S.lang))}</div></div><div class="ring"><svg width="58" height="58" viewBox="0 0 58 58"><circle cx="29" cy="29" r="22" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="6"/><circle cx="29" cy="29" r="22" fill="none" stroke="#FF8A7D" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}" transform="rotate(-90 29 29)"/></svg><span>${doneDoses}/${totalDoses}</span></div></div><div class="muted small" style="margin:-2px 0 6px">${esc(t('taken'))}</div>${slotHtml || `<div class="muted">${esc(L('No scheduled medicines today.', 'आज कोई तय दवा नहीं।'))}</div>`}</div>
    <div class="kpis">${td.nextVisit ? `<button class="kpi" data-a="tab" data-k="visits"><small>${esc(t('nextVisit'))}</small><b>${esc(td.nextVisit.name)}</b><span>${esc(fmtDate(td.nextVisit.due, S.lang))} · ${esc(relDays(td.nextVisit.due, S.lang))}</span></button>` : ''}
    ${td.nextTest ? `<button class="kpi" data-a="tab" data-k="tests"><small>${esc(t('nextTest'))}</small><b>${esc(td.nextTest.name)}</b><span>${esc(fmtDate(td.nextTest.due, S.lang))} · ${esc(relDays(td.nextTest.due, S.lang))}</span></button>` : ''}</div>
    ${exs.length ? `<div class="card"><h3>💪 ${esc(t('exercises'))}</h3>${exs.map((e, ei) => `<div class="small">${esc(L(e.en, e.hi))}</div><div class="ex-row">${Array.from({ length: e.freq_per_day }, (_, i) => { const k = `${T_ISO}|ex${ei}|${i}`; return `<button class="${S.exTicks[k] ? 'on' : ''}" data-a="extick" data-k="${k}">${S.exTicks[k] ? '✓' : i + 1}</button>`; }).join('')}</div>`).join('')}</div>` : ''}
    ${attn.length ? `<div class="group-h">${esc(t('needsYou'))}</div>${attn.join('')}` : ''}
    <div class="row" style="margin-top:6px"><button class="btn btn-s grow btn-sm" data-a="go" data-to="prep">🩺 ${esc(t('s13T'))}</button><button class="btn btn-s grow btn-sm" data-a="go" data-to="whatsapp">💬 WhatsApp</button></div>`;
}
function tabMeds() {
  const P = S.plan; const g = (st) => P.meds.filter((m) => st.includes(m.status));
  const sec = (title, list) => (list.length ? `<div class="group-h">${esc(title)} · ${list.length}</div>${list.map(medCard).join('')}` : '');
  return sec(L('Give now', 'अभी दें'), g(['NEW', 'CHANGED', 'ACTIVE'])) + sec(L('Ask the doctor first', 'पहले डॉक्टर से पूछें'), g(['ASK_DOCTOR'])) + sec(L('Stopped or finished', 'बंद या पूरी'), g(['STOPPED', 'COMPLETE']));
}
function timelineHtml(items) {
  return `<ul class="tl">${items.map((x) => `<li class="${x.due < T_ISO ? 'past' : ''}"><span class="ic">${x.kind === 'visit' ? '🩺' : '🧪'}</span><b>${esc(x.name)}</b><span class="small">${esc(fmtDate(x.due, S.lang))} · ${esc(relDays(x.due, S.lang))}</span>${x.prep ? `<div class="muted small">${esc(L('Prep', 'तैयारी'))}: ${esc(x.prep)}</div>` : ''}${x.basis ? `<div class="muted small">${esc(L(`6 months after the last test on ${fmtDate(x.basis.date, 'en')} (${x.basis.doc})`, `पिछली जांच (${x.basis.doc}) के 6 महीने बाद`))}</div>` : ''}<div class="row wrap">${srcBtn(x.source.doc, x.source.quote)}<button class="src" data-a="ics1" data-name="${esc(x.name)}" data-due="${x.due}">📅 ${esc(L('Add to calendar', 'कैलेंडर में जोड़ें'))}</button></div></li>`).join('')}</ul>`;
}
function tabVisits() { const v = S.plan.timeline.filter((x) => x.kind === 'visit'); return v.length ? `<div class="card">${timelineHtml(v)}</div>` : `<div class="empty">${esc(L('No visits found in your papers.', 'कागज़ों में कोई विज़िट नहीं मिली।'))}</div>`; }
function tabTests() {
  const P = S.plan;
  return `<div class="card"><h3>${esc(L('Upcoming tests and scans', 'आने वाली जांच'))}</h3>${timelineHtml(P.timeline.filter((x) => x.kind === 'test'))}</div>
  <div class="group-h">${esc(L('Reports, explained', 'रिपोर्ट, आसान भाषा में'))}</div>
  ${P.reports.map((r) => `<div class="card"><div class="row"><b class="grow">${esc(r.title)}</b><span class="muted small">${esc(fmtDate(r.date, S.lang))}</span></div><p class="small" style="margin:6px 0">${esc(L(r.summary_en, r.summary_hi))}</p>
  ${r.results.length ? `<table class="t">${r.results.map((x) => `<tr><td>${esc(x.test)}</td><td>${esc(x.value)}</td><td class="r"><span class="tag ${x.flag === 'low' || x.flag === 'high' || x.flag === 'attention' ? 't-ask' : 't-found'}">${esc(x.flag)}</span></td></tr>`).join('')}</table>` : ''}${srcBtn(r.doc, r.results[0]?.quote || '')}</div>`).join('') || `<div class="empty">${esc(L('No reports yet.', 'अभी कोई रिपोर्ट नहीं।'))}</div>`}
  <div class="muted small">${esc(L('Plain-language summaries are written by AI from the report; the doctor explains what they mean for you.', 'आसान सारांश AI ने रिपोर्ट से लिखे हैं; मतलब डॉक्टर बताएंगे।'))}</div>`;
}
function listCard(items, emoji) { return items.length ? `<div class="card">${items.map((x) => `<div class="li"><span class="em">${emoji}</span><div class="grow">${esc(L(x.en, x.hi))}${x.freq_per_day ? ` <span class="muted small">· ${x.freq_per_day}× ${esc(L('a day', 'रोज़'))}</span>` : ''}<br>${x.sources.map((s) => srcBtn(s.doc, s.quote)).join(' ')}</div></div>`).join('')}</div>` : `<div class="empty">${esc(L('Nothing in your papers yet.', 'कागज़ों में अभी कुछ नहीं।'))}</div>`; }
function tabDiet() { return listCard(S.plan.diet, '🥣'); }
function tabCare() { return `<div class="group-h">${esc(L('Exercises', 'कसरत'))}</div>${listCard(S.plan.exercises, '💪')}<div class="group-h">${esc(L('Precautions', 'सावधानियां'))}</div>${listCard(S.plan.precautions, '🛡️')}`; }
function tabWarn() { return `<div class="warn-card"><b>${esc(L('Go to the emergency room or call the care team if you notice:', 'इनमें से कुछ भी दिखे तो इमरजेंसी जाएं या डॉक्टर टीम को फोन करें:'))}</b>${listCard(S.plan.warning_signs, '⚠️').replace('class="card"', 'class="card" style="margin:10px 0 0;box-shadow:none"')}<a class="big-call" href="tel:112">📞 ${esc(t('emergency'))}</a><div class="muted small" style="margin-top:6px;text-align:center">112</div></div>`; }
function tabBills() {
  const P = S.plan, tot = P.bills.reduce((s, b) => s + b.amount, 0);
  return `<div class="card"><table class="t"><tr><th>${esc(L('Bill', 'बिल'))}</th><th>${esc(L('Status', 'स्थिति'))}</th><th class="r">₹</th></tr>${P.bills.map((b) => `<tr><td><b>${esc(b.what)}</b><br><span class="muted small">${esc(b.bill_no || '')} · ${esc(fmtDate(b.date, S.lang))}</span><br>${srcBtn(b.doc, b.quote, '')}</td><td class="small">${esc(b.claim_status || b.payer || '')}</td><td class="r">${inr(b.amount)}</td></tr>`).join('')}</table><div class="total"><span>${esc(L('Total', 'कुल'))}</span><span>₹${inr(tot)}</span></div></div>
  <div class="muted small">${esc(L('Keep receipts together for reimbursement; HomeBridge reminds you before a claim window closes.', 'रिइम्बर्समेंट के लिए रसीदें साथ रखें; क्लेम की तारीख से पहले याद दिलाया जाएगा।'))}</div>`;
}
function tabTeam() { return `<div class="card">${S.plan.contacts.map((c) => `<div class="li"><span class="em">🏥</span><div class="grow"><b>${esc(c.name)}</b><br><span class="small">${esc(c.phone || '')}</span>${c.phone ? ` · <a href="tel:${esc(c.phone.replace(/[^0-9+]/g, ''))}" class="small">${esc(L('Call', 'कॉल'))}</a>` : ''}<br>${srcBtn(c.doc, c.quote)}</div></div>`).join('') || esc(L('No contacts found.', 'कोई संपर्क नहीं मिला।'))}</div><a class="big-call" href="tel:112">📞 ${esc(t('emergency'))}</a><button class="btn btn-s btn-block" style="margin-top:10px" data-a="go" data-to="prep">🩺 ${esc(t('s13T'))}</button>`; }
function tabTreat() { const P = S.plan; return `<div class="card"><h3>${esc(L('Diagnosis', 'निदान'))}</h3>${P.diagnosis.map((d) => `<div class="li"><div>${esc(d.text)}<br>${srcBtn(d.doc, d.quote)}</div></div>`).join('')}</div><div class="card"><h3>${esc(L('Treatment so far', 'अब तक का इलाज'))}</h3>${P.treatment.map((d) => `<div class="li"><div>${esc(d.text)}<br>${srcBtn(d.doc, d.quote)}</div></div>`).join('')}</div>`; }
function tabRecord() {
  const P = S.plan, p = P.patient || {}, j = JOURNEYS[P.condition];
  return `<div class="card"><table class="t"><tr><td>${esc(L('Patient', 'मरीज़'))}</td><td><b>${esc(p.name || '—')}</b></td></tr><tr><td>${esc(L('Age / sex', 'उम्र / लिंग'))}</td><td>${esc(p.age_sex || '—')}</td></tr><tr><td>${esc(L('Hospital registration no.', 'अस्पताल रजिस्ट्रेशन नं.'))}</td><td><b>${esc(p.reg_no || '—')}</b></td></tr><tr><td>${esc(L('Allergies', 'एलर्जी'))}</td><td>${esc(p.allergies || '—')}</td></tr><tr><td>${esc(L('Checklist', 'चेकलिस्ट'))}</td><td>${esc(L(j.name.en, j.name.hi))}</td></tr>${S.dates.treatEnd ? `<tr><td>${esc(t('dEnd'))}</td><td>${esc(fmtDate(S.dates.treatEnd, S.lang))}</td></tr>` : ''}<tr><td>${esc(L('Papers in vault', 'तिजोरी में कागज़'))}</td><td>${S.docs.length}</td></tr></table></div><div class="muted small">${esc(L('Show the registration number at every visit and for every report.', 'हर विज़िट और रिपोर्ट के लिए रजिस्ट्रेशन नंबर दिखाएं।'))}</div>`;
}
function scrPlan() {
  const body = { today: tabToday, meds: tabMeds, visits: tabVisits, tests: tabTests, diet: tabDiet, care: tabCare, warn: tabWarn, bills: tabBills, team: tabTeam, treat: tabTreat, record: tabRecord }[S.tab]();
  const p = S.plan.patient || {};
  return `<div class="screen fade" style="padding-top:12px"><div class="row" style="margin-bottom:10px"><div class="grow"><b>${esc(p.name || L('Patient', 'मरीज़'))}</b><div class="muted small">${esc(L(JOURNEYS[S.plan.condition].name.en, JOURNEYS[S.plan.condition].name.hi))}</div></div><span class="tag ${Object.values(S.sourceOf).includes('live') ? 't-live' : 't-key'}">${Object.values(S.sourceOf).includes('live') ? '● ' + esc(t('liveOn')) : esc(t('keyOn'))}</span></div>${body}</div>`;
}

// ---------- S10: medicine box and cart ----------
function scrBox() {
  const cart = buildCart(S.plan, S.home);
  let total = 0;
  const lines = cart.lines.map((l, li) => {
    if (l.note) return `<div class="cart-line"><b>${esc(l.med.name)}</b><div class="note unclear">${esc(L(l.note === 'dose_missing' ? 'Dose not clear on the paper. A pharmacist will confirm.' : 'Not in the demo catalogue.', 'पर्चे में खुराक साफ नहीं। फार्मासिस्ट पुष्टि करेगा।'))}</div></div>`;
    const pickKey = l.med.key; const chosen = S.pick[pickKey] ?? 0; const o = l.offers[chosen] || l.offers[0]; total += o.total;
    const chName = { online: '1mg online', jan: 'Jan Aushadhi', local: L('Local chemist', 'पास का केमिस्ट') };
    return `<div class="cart-line"><div class="row"><b class="grow">${esc(l.med.name)}</b>${statusTag(l.med.status)}</div>
      <div class="muted small">${l.tablet ? esc(L(`Need ${l.needUnits} for ${l.days} days, ${l.haveUnits} at home`, `${l.days} दिन के लिए ${l.needUnits} चाहिए, घर पर ${l.haveUnits}`)) : esc(L(`Covers ${l.days} days, ${l.haveUnits} pack at home`, `${l.days} दिन के लिए, घर पर ${l.haveUnits}`))} → <b>${l.packs} × ${esc(l.offers[0].pack)}</b></div>
      ${l.flag ? `<div class="note unclear">${esc(L('Duration not on the paper; 30 days assumed. Confirm with the doctor.', 'अवधि नहीं लिखी; 30 दिन माने गए। डॉक्टर से पुष्टि करें।'))}</div>` : ''}
      ${l.offers.slice(0, 4).map((x, i) => `<button class="offer ${i === chosen ? 'on' : ''}" data-a="pick" data-k="${pickKey}" data-i="${i}"><span class="ch">${esc(chName[x.channel])}</span><span class="grow">${esc(x.product)}</span>${i === 0 ? `<span class="best">${esc(L('Cheapest', 'सबसे सस्ता'))}</span>` : ''}<b>₹${inr(x.total)}</b></button>`).join('')}
      ${srcBtn(l.med.source.doc, l.med.source.quote)}</div>`;
  }).join('');
  return `<div class="screen fade"><div class="h1">${esc(t('s10T'))}</div><p class="sub">${esc(t('s10S'))}</p>
    <div class="group-h">${esc(t('boxH'))}</div><div class="card">${S.home.length ? '' : `<div class="muted small" style="margin-bottom:8px">${esc(L('Tell us what is already at home so you only buy what is missing.', 'घर पर क्या है बताएं, ताकि सिर्फ कमी वाली दवा खरीदें।'))}</div><button class="btn btn-sm btn-soft" data-a="sampleBox">${esc(L('Use the sample case’s medicine box (6 items)', 'सैंपल केस का दवा डिब्बा लें (6 चीज़ें)'))}</button>`}${S.home.map((h, i) => `<div class="li"><span class="em">💊</span><span class="grow">${esc(h.name)}<br><span class="muted small">${esc(h.unit)}</span></span><span class="stepper"><button data-a="qty" data-i="${i}" data-d="-1">−</button><span>${esc(h.qty)}</span><button data-a="qty" data-i="${i}" data-d="1">+</button></span></div>`).join('')}
      <div class="row" style="margin-top:8px"><input id="newmed" class="searchbox" style="margin:0" placeholder="${esc(L('Add a medicine, e.g. Dolo 650', 'दवा जोड़ें, जैसे Dolo 650'))}"><button class="btn btn-sm btn-soft" data-a="addmed">+</button></div></div>
    <div class="group-h">${esc(t('buyH'))}</div>${lines || `<div class="empty">${esc(L('Nothing to buy: the box has enough.', 'कुछ नहीं खरीदना: डिब्बे में काफी है।'))}</div>`}
    ${lines ? `<div class="card"><div class="total"><span>${esc(L('To pay', 'भुगतान'))}</span><span>₹${inr(total)}</span></div><div class="muted small">${esc(t('illus'))}</div></div>` : ''}
    ${cart.sos.length ? `<div class="group-h">${esc(t('sosH'))}</div><div class="card">${cart.sos.map((x) => `<div class="li"><span class="grow">${esc(x.med.name)}</span><span class="muted small">${x.have ? esc(t('atHome')) + ': ' + esc(x.have.qty) + ' ' + esc(x.have.unit) : esc(L('none at home', 'घर पर नहीं'))}</span></div>`).join('')}</div>` : ''}
    ${cart.removeFromBox.length ? `<div class="group-h">${esc(t('removeH'))}</div><div class="card" style="border-color:#F6C9C3">${cart.removeFromBox.map((h) => `<div class="li"><span class="em">🚫</span><span class="grow">${esc(h.name)}</span></div>`).join('')}</div>` : ''}
    ${cart.onHold.length ? `<div class="group-h">${esc(t('holdH'))}</div><div class="card">${cart.onHold.map((m) => `<div class="li"><span class="em">❓</span><span class="grow">${esc(m.name)}</span><button class="btn btn-sm btn-soft" data-a="addq" data-q="${esc(`Should ${m.name} continue? It is at home but not on any of the papers.`)}">${esc(t('addQ'))}</button></div>`).join('')}</div>` : ''}
  </div>${lines ? `<div class="dock"><button class="btn btn-p btn-block" data-a="order" data-total="${total}">${esc(t('order'))} · ₹${inr(total)}</button></div>` : ''}`;
}

// ---------- S11: reminders ----------
function scrReminders() {
  const cart = buildCart(S.plan, S.home); const rs = buildReminders(S.plan, cart);
  const ic = { medicine: '💊', exercise: '💪', visit: '🩺', test: '🧪', refill: '🔁', claim: '🧾' };
  return `<div class="screen fade"><div class="h1">${esc(t('s11T'))}</div><p class="sub">${esc(t('s11S'))}</p>
    <div class="card"><label class="row"><input type="checkbox" data-in="rPat" ${S.reminderFor.patient ? 'checked' : ''}> ${esc(t('patientR'))}</label><label class="row" style="margin-top:6px"><input type="checkbox" data-in="rCare" ${S.reminderFor.caregiver ? 'checked' : ''}> ${esc(t('caregiverR'))}</label></div>
    <div class="card">${rs.map((r) => `<div class="li"><span class="em">${ic[r.kind]}</span><div class="grow"><b>${esc(r.title)}</b><br><span class="muted small">${esc(r.date ? fmtDate(r.date, S.lang) + ' · ' + relDays(r.date, S.lang) : r.when)}</span></div></div>`).join('')}</div>
    <div class="stack"><button class="btn btn-p btn-block" data-a="icsAll">📅 ${esc(t('ics'))}</button><button class="btn btn-s btn-block" data-a="go" data-to="whatsapp">💬 ${esc(t('waPrev'))}</button></div>
  </div>`;
}

// ---------- S12: ask your documents ----------
function scrAsk() {
  const sugg = S.lang === 'hi' ? ['कौन सा कुल्ला, और कितनी बार?', 'अगला स्कैन कब है?', 'थायराइड टेस्ट कब है?', 'कुल खर्च कितना हुआ?'] : ['Which mouthwash, and how often?', 'When is the next scan?', 'What did the biopsy report say?', 'How much have we spent?', 'Can he stop the pilocarpine?'];
  return `<div class="screen fade"><div class="h1">${esc(t('s12T'))}</div><p class="sub">${esc(t('s12S'))}</p>
    <div class="sugg">${sugg.map((q) => `<button data-a="askq" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
    <div class="chat">${S.chat.map((m) => m.role === 'me' ? `<div class="bub me">${esc(m.text)}</div>` : `<div class="bub ai">${m.pending ? '<span class="spinner"></span>' : esc(m.text)}${m.cites && m.cites.length ? `<div class="cites">${m.cites.map((c) => `<button class="cite" data-a="src" data-i="${S.srcReg.push(c) - 1}">↗ ${esc(c.doc)}</button>`).join('')}</div>` : ''}${m.addQ ? `<div style="margin-top:8px"><button class="btn btn-sm btn-soft" data-a="addq" data-q="${esc(m.addQ)}">${S.visitQs.includes(m.addQ) ? '✓ ' + esc(t('added')) : '+ ' + esc(t('addQ'))}</button></div>` : ''}${m.mode ? `<div class="muted small" style="margin-top:6px">${esc(m.mode)}</div>` : ''}</div>`).join('')}</div>
  </div><form class="askbar" data-form="ask"><input id="askin" placeholder="${esc(t('askPh'))}" autocomplete="off"><button class="btn btn-p btn-sm" type="submit">${esc(L('Ask', 'पूछें'))}</button></form>`;
}
async function doAsk(q) {
  q = q.trim(); if (!q) return;
  S.chat.push({ role: 'me', text: q });
  if (ADVICE_RE.test(q)) { S.chat.push({ role: 'ai', text: t('adviceNo'), addQ: q }); if (!S.visitQs.includes(q)) S.visitQs.push(q); render(); return; }
  const hits = search(S.index, q, 5);
  const msg = { role: 'ai', pending: true }; S.chat.push(msg); render();
  let text, cites = [];
  if (AI.live) {
    try {
      text = await askLive(q, hits, S.plan, S.lang);
      const ids = [...new Set((text.match(/\[(D\d+|U\d+)[^\]]*\]/g) || []).map((x) => x.match(/D\d+|U\d+/)[0]))];
      cites = ids.map((id) => ({ doc: id, quote: (hits.find((h) => h.c.doc === id)?.c.text.split('\n')[0]) || '' }));
      msg.mode = `${L('Answered by', 'जवाब')}: ${AI.label} · ${L('searched', 'खोजा')} ${hits.length} ${L('passages', 'अंश')}`;
    } catch (e) { text = null; }
  }
  if (!text) { const r = answerOffline(q, hits, S.plan, S.lang); text = r.text; cites = [...new Set(r.cites)].map((id) => ({ doc: id, quote: hits.find((h) => h.c.doc === id)?.c.text.split('\n')[0] || '' })); msg.mode = L('Offline answer: plan + keyword search', 'ऑफ़लाइन जवाब'); }
  if (text.includes('NOT_IN_PAPERS')) { text = t('notIn'); cites = []; msg.addQ = q; }
  msg.pending = false; msg.text = text; msg.cites = cites;
  render();
}

// ---------- S13: visit prep ----------
function prepText() {
  const P = S.plan, p = P.patient || {}, next = buildToday(P).nextVisit;
  const active = P.meds.filter((m) => ['NEW', 'CHANGED', 'ACTIVE'].includes(m.status));
  const changed = P.meds.filter((m) => m.status === 'STOPPED' || m.status === 'NEW' || m.status === 'CHANGED');
  const qs = [...S.visitQs, ...P.meds.filter((m) => m.status === 'ASK_DOCTOR').map((m) => `Should ${m.name} continue? It is at home but not on any paper.`), ...P.meds.filter((m) => m.notes.some((n) => n.kind === 'unclear') && m.status !== 'ASK_DOCTOR').map((m) => `How long should ${m.name} continue?`), ...P.gaps.items.filter((i) => i.status === 'NOT_FOUND').map((i) => i.q)];
  const uq = [...new Set(qs)];
  return {
    next, sections: [
      ['Patient', [`${p.name || ''} · ${p.age_sex || ''} · Reg. no. ${p.reg_no || '—'} · Allergies: ${p.allergies || '—'}`]],
      ['Diagnosis and treatment', [...P.diagnosis.slice(0, 2).map((d) => d.text), ...P.treatment.map((d) => d.text)]],
      ['Current medicines', active.map((m) => `${m.name} — ${m.sos ? 'SOS' : m.dose_pattern || ''}${m.timing ? ', ' + m.timing : ''} (${m.source.doc})`)],
      ['Changes since discharge', changed.map((m) => `${m.name}: ${m.status.toLowerCase()} (${m.source.doc})`)],
      ['Recent results', P.results.slice(-4).map((r) => `${r.test}: ${r.value} (${r.doc}, ${fmtDate(r.date)})`)],
      ['Coming up', P.timeline.filter((x) => x.due >= T_ISO).map((x) => `${x.name}: ${fmtDate(x.due)}`)],
      ['Questions to ask', uq],
    ],
  };
}
function scrPrep() {
  const pt = prepText();
  return `<div class="screen fade"><div class="h1">${esc(t('s13T'))}</div><p class="sub">${esc(t('s13S'))}</p>
    ${pt.next ? `<div class="alert" style="background:var(--blue-l);border-color:#C9D9F7">🩺 <span><b>${esc(pt.next.name)}</b><br>${esc(fmtDate(pt.next.due, S.lang))} · ${esc(relDays(pt.next.due, S.lang))}</span></div>` : ''}
    <div class="card prep">${pt.sections.map(([h, items]) => items.length ? `<h4>${esc(h)}</h4><ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '').join('')}</div>
  </div><div class="dock"><button class="btn btn-s grow" data-a="copyPrep">${esc(t('copy'))}</button><button class="btn btn-p grow" data-a="dlPrep">${esc(t('download'))}</button></div>`;
}

// ---------- S14: document vault ----------
function scrVault() {
  let list = S.docs.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (S.vaultType !== 'all') list = list.filter((d) => (S.extractions[d.id]?.doc_type || d.type) === S.vaultType);
  let hitsBy = null;
  if (S.vaultQ.trim()) { const hs = search(S.index, S.vaultQ, 12); hitsBy = {}; for (const h of hs) (hitsBy[h.c.doc] = hitsBy[h.c.doc] || []).push(h.c); list = list.filter((d) => hitsBy[d.id]); }
  const types = ['all', ...new Set(S.docs.map((d) => S.extractions[d.id]?.doc_type || d.type || 'other'))];
  const sel = Object.keys(S.vaultSel).filter((k) => S.vaultSel[k]);
  return `<div class="screen fade"><div class="h1">${esc(t('s14T'))}</div><p class="sub">${esc(t('s14S'))}</p>
    <input class="searchbox" data-in="vaultQ" placeholder="${esc(t('searchPh'))}" value="${esc(S.vaultQ)}">
    <div class="tabs" style="padding:0 0 10px;background:none;border:0">${types.map((k) => `<button class="tab ${S.vaultType === k ? 'on' : ''}" data-a="vtype" data-k="${k}">${esc(k === 'all' ? t('all') : L(DOC_TYPE_LABEL[k]?.en || k, DOC_TYPE_LABEL[k]?.hi))}</button>`).join('')}</div>
    ${list.map((d) => `<div class="docrow" style="padding:10px"><input type="checkbox" data-in="vsel" data-id="${d.id}" ${S.vaultSel[d.id] ? 'checked' : ''}><button class="grow" style="text-align:left" data-a="opendoc" data-id="${d.id}"><span class="id">${esc(d.id)}</span> <b>${esc(d.title)}</b><br><span class="muted small">${esc(L(DOC_TYPE_LABEL[S.extractions[d.id]?.doc_type || d.type]?.en || 'Document', DOC_TYPE_LABEL[S.extractions[d.id]?.doc_type || d.type]?.hi))} · ${esc(fmtDate(d.date, S.lang))}${S.extractions[d.id] ? '' : ' · ' + esc(L('not read yet', 'अभी पढ़ा नहीं'))}</span>${hitsBy ? `<br><span class="small"><span class="hl">${esc(hitsBy[d.id][0].text.split('\n').find((l) => tokenize(l).some((w) => tokenize(S.vaultQ).concat(expandQuery(S.vaultQ).extra).includes(w))) || hitsBy[d.id][0].text.split('\n')[0])}</span></span>` : ''}</button></div>`).join('') || `<div class="empty">${esc(L('No papers match.', 'कोई कागज़ नहीं मिला।'))}</div>`}
    <button class="btn btn-s btn-block" style="margin-top:10px" data-a="go" data-to="upload">+ ${esc(t('addPapers'))}</button>
  </div>${sel.length ? `<div class="dock"><button class="btn btn-p btn-block" data-a="pack">${esc(t('sharePack'))} (${sel.length})</button></div>` : ''}`;
}

// ---------- S15: WhatsApp updates ----------
function waMessages() {
  const P = S.plan, td = buildToday(P), hi = S.reminderFor.patient;
  const m1 = hi ? `🌅 सुप्रभात! आज सुबह की दवाएं:\n${td.slots.morning.map((m) => '• ' + m.name).join('\n')}\nलेने के बाद 1 भेजें।` : `🌅 Morning medicines:\n${td.slots.morning.map((m) => '• ' + m.name).join('\n')}\nReply 1 when taken.`;
  const d4 = S.docs.find((d) => d.id === 'D4');
  const changes = P.meds.filter((m) => m.source.doc === (d4 ? 'D4' : P.meds[0]?.source.doc) && ['NEW', 'STOPPED', 'CHANGED'].includes(m.status));
  const m2 = `📄 Added: ${d4 ? d4.title + ', ' + fmtDate(d4.date) : 'new paper'}.\nChanges: ${changes.map((m) => `${m.name} ${m.status === 'NEW' ? 'started' : m.status.toLowerCase()}`).join('; ') || 'none'}.\nNext: ${P.timeline.filter((x) => x.due >= T_ISO).slice(0, 2).map((x) => `${x.name} on ${fmtDate(x.due)}`).join(', ')}.\nReply 1 to see today's medicines.`;
  const v = td.nextVisit;
  const m3 = v ? `🩺 Reminder: ${v.name} ${relDays(v.due)} (${fmtDate(v.due)}). Carry the Reg. no. ${P.patient?.reg_no || ''} and your visit prep sheet.` : '';
  const ask = P.meds.filter((m) => m.status === 'ASK_DOCTOR').length;
  const m4 = `📊 Weekly summary for the caregiver:\n• Medicines on track this week\n• ${ask} question(s) for the doctor\n• Next: ${P.timeline.filter((x) => x.due >= T_ISO).slice(0, 1).map((x) => `${x.name}, ${fmtDate(x.due)}`).join('')}`;
  return [m1, m2, m3, m4].filter(Boolean);
}
const WA = { ok: false, checked: false, to: '', busy: false, status: '', timer: null };
async function waCheck() {
  if (WA.checked || !/^https?:/.test(location.protocol)) return; WA.checked = true;
  try { const r = await fetch('api/whatsapp'); if (r.ok) { const j = await r.json(); WA.ok = !!j.ok; WA.sandbox = j.sandbox; } } catch (e) { /* not hosted */ }
  try { WA.to = localStorage.getItem('hb_wa_to') || ''; } catch (e) { /* storage blocked */ }
  if (S.screen === 'whatsapp') render();
}
async function waSend(messages, label) {
  const to = (document.getElementById('wato')?.value || WA.to).replace(/[^\d+]/g, '');
  WA.to = to; try { localStorage.setItem('hb_wa_to', to); } catch (e) { /* ignore */ }
  WA.busy = true; WA.status = L('Sending…', 'भेज रहे हैं…'); render();
  try {
    const r = await fetch('api/whatsapp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to, messages }) });
    const j = await r.json().catch(() => ({}));
    WA.status = r.ok ? `✅ ${label || L(`Sent ${j.sent} message(s) to ${to}`, `${to} पर ${j.sent} संदेश भेजे`)}` : `⚠️ ${j.error || 'Could not send'}${j.hint ? ' ' + j.hint : ''}`;
  } catch (e) { WA.status = '⚠️ ' + L('Could not reach the server.', 'सर्वर से जुड़ नहीं पाए।'); }
  WA.busy = false; render();
}
function scrWhatsApp() {
  waCheck();
  const ms = waMessages();
  const outIdx = 1;
  const num = WA.to.replace(/[^\d]/g, '');
  const waLink = (m) => `https://wa.me/${num}?text=${encodeURIComponent(m)}`;
  const live = WA.ok ? `<div class="card wa-live"><h3>📲 ${esc(L('Send to a real WhatsApp', 'असली WhatsApp पर भेजें'))}</h3>
      <div class="field"><label>${esc(L('Family member’s WhatsApp number', 'परिवार के सदस्य का WhatsApp नंबर'))}</label><input id="wato" type="tel" placeholder="+9198XXXXXXXX" value="${esc(WA.to)}"></div>
      <div class="row wrap"><button class="btn btn-wa grow" data-a="waNow" ${WA.busy ? 'disabled' : ''}>💬 ${esc(L('Send these updates now', 'ये अपडेट अभी भेजें'))}</button><button class="btn btn-s grow" data-a="waLater" ${WA.busy || WA.timer ? 'disabled' : ''}>⏱️ ${esc(WA.timer ? L('Reminder set for 1 minute', '1 मिनट में रिमाइंडर') : L('Send the medicine reminder in 1 minute', '1 मिनट में दवा रिमाइंडर'))}</button></div>
      ${WA.status ? `<div class="muted small" style="margin-top:8px">${esc(WA.status)}</div>` : ''}
      ${WA.sandbox ? `<div class="muted small" style="margin-top:6px">${esc(L('Demo uses the Twilio WhatsApp sandbox: the phone must first send the join code to the sandbox number.', 'डेमो Twilio sandbox से: फोन से पहले join कोड भेजें।'))}</div>` : ''}</div>`
    : `<div class="field" style="margin-top:12px"><label>${esc(L('WhatsApp number (optional)', 'WhatsApp नंबर (वैकल्पिक)'))}</label><input id="wato" type="tel" data-in="wato" placeholder="+9198XXXXXXXX" value="${esc(WA.to)}"></div>`;
  return `<div class="screen fade"><div class="h1">${esc(t('s15T'))}</div><p class="sub">${esc(WA.ok ? L('What the family receives. Sending works for real from this link.', 'परिवार को क्या मिलेगा। इस लिंक से सच में भेजा जा सकता है।') : t('s15S'))}</p>
    <div class="wa">${ms.map((m, i) => `${i === outIdx ? `<div class="msg out">📷 IMG_2041.jpg<div class="meta">${esc(L('You forwarded a new prescription', 'आपने नया पर्चा भेजा'))}</div></div>` : ''}<div class="msg">${esc(m)}<div class="meta">HomeBridge · ${['08:00', '11:42', '18:00', 'Sun 19:00'][i] || ''} · <a href="${waLink(m)}" target="_blank" rel="noreferrer">${esc(t('openWa'))}</a></div></div>`).join('')}</div>
    ${live}
    ${WA.ok ? '' : `<a class="btn btn-wa btn-block" style="margin-top:12px" href="${waLink(ms[0])}" target="_blank" rel="noreferrer">💬 ${esc(t('openWa'))}</a>`}
    <p class="muted small" style="margin-top:10px">${esc(L('Production: the WhatsApp Business API sends approved reminder templates on schedule, and families can forward new papers to the vault. V3 adds Hindi voice notes and call reminders.', 'असली ऐप में WhatsApp Business API से तय समय पर रिमाइंडर जाएंगे। V3 में हिंदी वॉइस नोट और कॉल रिमाइंडर।'))}</p>
  </div>`;
}

// ---------- More sheet and source viewer ----------
function sheetHtml() {
  if (!S.sheet) return '';
  if (S.sheet.kind === 'more') {
    const items = [['reminders', '⏰', t('s11T')], ['prep', '🩺', t('s13T')], ['whatsapp', '💬', t('s15T')], ['checklist', '📋', t('s4T')], ['upload', '➕', t('addPapers')], ['rules', '⚖️', t('rulesT')]];
    return `<div class="sheet-bg" data-a="close"><div class="sheet" data-stop><div class="grab"></div>${items.map(([to, ic, label]) => `<button class="opt" data-a="go" data-to="${to}"><span class="ic">${ic}</span><b>${esc(label)}</b></button>`).join('')}${/^https?:/.test(location.protocol) ? `<a class="opt" href="papers.html${DEMO_DATE ? '?today=' + DEMO_DATE : ''}" target="_blank" rel="noreferrer"><span class="ic">🖨️</span><b>${esc(L('Print the sample papers', 'सैंपल कागज़ प्रिंट करें'))}</b></a>` : ''}<button class="opt" data-a="restart"><span class="ic">↺</span><b>${esc(t('startOver'))}</b></button></div></div>`;
  }
  if (S.sheet.kind === 'doc') {
    const d = docOf(S.sheet.doc); if (!d) return '';
    let body;
    if (d.text) {
      const q = squash(S.sheet.quote || '');
      const lines = d.text.split('\n');
      body = lines.map((l) => { const sl = squash(l); const hit = q && sl && (sl.includes(q.slice(0, 40)) || (q.length > 6 && q.includes(sl) && sl.length > 6)); return hit ? `<mark>${esc(l)}</mark>` : esc(l); }).join('\n');
    } else body = d.thumb ? `<img src="${d.thumb}" alt="${esc(d.title)}">` : esc(L('Preview not available.', 'झलक उपलब्ध नहीं।'));
    const ex = S.extractions[d.id];
    return `<div class="sheet-bg" data-a="close"><div class="sheet" data-stop><div class="grab"></div><div class="row"><b class="grow">${esc(d.id)} · ${esc(d.title)}</b><button class="btn btn-sm btn-s" data-a="close">✕</button></div><div class="muted small" style="margin:2px 0 10px">${esc(fmtDate(d.date, S.lang))}${S.sourceOf[d.id] ? ' · ' + (S.sourceOf[d.id] === 'live' ? 'read by ' + AI.label : 'answer key') : ''}</div>${ex?.summary_en ? `<div class="note" style="margin-bottom:10px">${esc(L(ex.summary_en, ex.summary_hi))}</div>` : ''}<div class="paper">${body}</div></div></div>`;
  }
  if (S.sheet.kind === 'order') return `<div class="sheet-bg" data-a="close"><div class="sheet" data-stop><div class="grab"></div><div style="font-size:40px;text-align:center">✅</div><div class="h2" style="text-align:center">${esc(L('Order placed (demo)', 'ऑर्डर हो गया (डेमो)'))}</div><p class="sub" style="text-align:center">HB-${S.sheet.id} · ₹${inr(S.sheet.total)}<br>${esc(L('A pharmacist checks every item against your papers before dispatch. Refill reminders are on.', 'भेजने से पहले फार्मासिस्ट हर दवा कागज़ों से मिलाएगा। रिफिल रिमाइंडर चालू हैं।'))}</p><button class="btn btn-p btn-block" data-a="go" data-to="plan">${esc(t('toPlan'))}</button></div></div>`;
  return '';
}

// ---------------- Render ----------------
const SCREENS = { rules: scrRules, landing: scrLanding, condition: scrCondition, upload: scrUpload, reading: scrReading, checklist: scrChecklist, plan: scrPlan, box: scrBox, reminders: scrReminders, ask: scrAsk, prep: scrPrep, vault: scrVault, whatsapp: scrWhatsApp };
const NAV = [['plan', '🏠', 'navHome'], ['vault', '🗂️', 'navVault'], ['ask', '💬', 'navAsk'], ['box', '🛒', 'navBuy'], ['more', '☰', 'navMore']];
let lastScreen = null;
function render() {
  const app = document.getElementById('app');
  const sc = app.querySelector('.scroll');
  if (sc && lastScreen) S.scroll[lastScreen + (lastScreen === 'plan' ? S.tab : '')] = sc.scrollTop;
  S.srcReg = [];
  const hasNav = !!S.plan && !['landing', 'condition', 'reading'].includes(S.screen);
  const inner = SCREENS[S.screen]();
  app.className = 'app' + (hasNav ? ' with-nav' : '') + (S.simple ? ' simple' : '');
  app.innerHTML = `<header class="top"><button class="brand" data-a="home"><svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#FF6F61"/><path d="M8 26c4-9 20-9 24 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M13 26v-4.5M20 26v-6.5M27 26v-4.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><path d="M6 28.5h28" stroke="#FFD3CD" stroke-width="2.4" stroke-linecap="round"/></svg><span><b>HomeBridge</b><small>${esc(t('tag'))}</small></span></button>${DEMO_DATE ? `<span class="pill-btn dchip" title="Demo date pinned with ?today=">📅 ${Number(T_ISO.slice(8))} ${MONTHS[Number(T_ISO.slice(5, 7)) - 1]}</span>` : ''}<button class="pill-btn ${S.simple ? 'on' : ''}" data-a="simple" title="${esc(t('simple'))}">👓 ${esc(S.lang === 'hi' ? 'आसान' : 'Simple')}</button><button class="pill-btn" data-a="lang">${esc(t('lang'))}</button></header>
    ${S.screen === 'plan' ? renderTabs() : ''}
    <main class="scroll">${inner.split('</div><div class="dock">')[0]}${inner.includes('</div><div class="dock">') ? '</div>' : ''}</main>
    ${inner.includes('</div><div class="dock">') ? '<div class="dock">' + inner.split('</div><div class="dock">')[1] : ''}
    ${hasNav ? `<nav class="nav">${NAV.map(([k, ic, lab]) => `<button class="${(k === S.screen) || (k === 'more' && ['reminders', 'prep', 'whatsapp', 'checklist', 'rules'].includes(S.screen)) ? 'on' : ''}" data-a="${k === 'more' ? 'more' : 'go'}" data-to="${k}"><span class="ni">${ic}</span>${esc(t(lab))}</button>`).join('')}</nav>` : ''}
    ${sheetHtml()}${S.toast ? `<div class="toast">${esc(S.toast)}</div>` : ''}`;
  // the ask form sits outside main
  if (S.screen === 'ask') { const f = app.querySelector('[data-form="ask"]'); if (!f) { /* moved by split */ } }
  const ns = app.querySelector('.scroll');
  const key = S.screen + (S.screen === 'plan' ? S.tab : '');
  if (ns) ns.scrollTop = S.screen === 'ask' ? 1e6 : (S.scroll[key] || 0);
  lastScreen = S.screen;
  const rail = document.getElementById('rail'); if (rail) rail.innerHTML = renderRail();
  const fi = document.getElementById('file'); if (fi) fi.onchange = (e) => addFiles([...e.target.files]);
  const fc = document.getElementById('file2'); if (fc) fc.onchange = (e) => addFiles([...e.target.files]);
}
function go(to) { S.sheet = null; if (to === 'plan' && !S.plan) to = 'landing'; S.screen = to; render(); const ns = document.querySelector('.scroll'); if (ns && to !== 'ask') ns.scrollTop = 0; }
function toast(msg) { S.toast = msg; render(); setTimeout(() => { S.toast = null; render(); }, 2600); }

// ---------------- Files ----------------
let upCount = 0;
async function addFiles(files) {
  for (const f of files.slice(0, 15)) {
    if (f.size > 8 * 1024 * 1024) { toast(L(`${f.name} is over 8 MB`, `${f.name} 8 MB से बड़ी है`)); continue; }
    const id = 'U' + (++upCount);
    const doc = { id, title: f.name.replace(/\.[^.]+$/, '').slice(0, 40), date: T_ISO, type: 'other', text: '', images: [], thumb: null };
    try {
      if (/^image\//.test(f.type)) { const { blob, url } = await shrinkImage(f); doc.images = [blob]; doc.thumb = url; }
      else if (f.type === 'application/pdf') { const r = await readPdf(f); doc.text = r.text; doc.images = r.images; doc.thumb = r.thumb; }
      else doc.text = await f.text();
    } catch (e) { toast(L(`Could not open ${f.name}. Try a photo instead.`, `${f.name} नहीं खुली। फोटो आज़माएं।`)); continue; }
    S.docs.push(doc);
  }
  S.index = buildIndex(S.docs);
  render();
}
function shrinkImage(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = () => { const sc = Math.min(1, 1600 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); c.toBlob((b) => res({ blob: b, url: c.toDataURL('image/jpeg', 0.6) }), 'image/jpeg', 0.85); };
    img.onerror = rej; img.src = url;
  });
}
let pdfjsReady = null;
function loadPdfJs() {
  if (pdfjsReady) return pdfjsReady;
  pdfjsReady = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'; s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; res(window.pdfjsLib); }; s.onerror = rej; document.head.appendChild(s); });
  return pdfjsReady;
}
async function readPdf(file) {
  const lib = await loadPdfJs();
  const pdf = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  let text = ''; const images = []; let thumb = null;
  for (let p = 1; p <= Math.min(pdf.numPages, 6); p++) {
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    let lastY = null; for (const it of tc.items) { const y = it.transform[5]; text += (lastY !== null && Math.abs(y - lastY) > 4 ? '\n' : ' ') + it.str; lastY = y; }
    text += '\n\n';
    if (p <= 3) {
      const vp = page.getViewport({ scale: 1.6 }); const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      images.push(await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.85)));
      if (!thumb) thumb = c.toDataURL('image/jpeg', 0.5);
    }
  }
  return { text: text.replace(/[ \t]+/g, ' ').trim().length > 80 ? text.trim() : '', images, thumb };
}

// ---------------- Processing (S3) ----------------
async function runProcessing() {
  const todo = S.docs.filter((d) => !S.extractions[d.id]);
  const useLive = AI.live && (S.useLive || todo.some((d) => !d.sample));
  S.proc = { step: 0, files: {}, live: useLive && AI.live, secs: 0, finished: false, cancel: false };
  go('reading');
  const timer = setInterval(() => { S.proc.secs++; if (S.screen === 'reading') render(); }, 1000);
  const advance = (n) => { S.proc.step = Math.max(S.proc.step, n); render(); };
  await new Promise((r) => setTimeout(r, 500)); advance(1);
  const live = {};
  const work = async (d) => {
    if (useLive && !S.proc.cancel && (!d.sample || S.useLive)) {
      try { live[d.id] = await extractLive(d).catch(() => new Promise((w) => setTimeout(w, 1500)).then(() => extractLive(d))); S.proc.files[d.id] = { state: 'done', src: 'live', type: live[d.id].doc_type, date: live[d.id].doc_date || d.date }; render(); return; }
      catch (e) { S.proc.error = L(`Live AI could not read ${d.id} (${String(e.message || e).slice(0, 80)}).`, `लाइव AI ${d.id} नहीं पढ़ पाया।`); }
    }
    if (d.sample) { S.proc.files[d.id] = { state: 'done', src: 'key', type: CACHED_EXTRACTIONS[d.id].doc_type, date: d.date }; }
    else S.proc.files[d.id] = { state: 'skip' };
    render();
  };
  advance(2);
  const queue = todo.slice(); const workers = Array.from({ length: useLive ? 4 : 1 }, async () => { while (queue.length) { const d = queue.shift(); if (!useLive) await new Promise((r) => setTimeout(r, 180)); await work(d); } });
  await Promise.all(workers);
  advance(3); await new Promise((r) => setTimeout(r, 400));
  // merge: live result where we have it, else the answer key for sample papers
  for (const d of todo) {
    if (live[d.id]) { S.extractions[d.id] = live[d.id]; S.sourceOf[d.id] = 'live'; if (live[d.id].doc_date) d.date = live[d.id].doc_date; d.type = live[d.id].doc_type || d.type; if (!d.sample && live[d.id].doc_type) d.title = (DOC_TYPE_LABEL[live[d.id].doc_type]?.en || d.title); }
    else if (d.sample) { S.extractions[d.id] = CACHED_EXTRACTIONS[d.id]; S.sourceOf[d.id] = 'key'; }
  }
  advance(4); await new Promise((r) => setTimeout(r, 400));
  const condition = S.condition === 'auto' ? null : S.condition;
  S.plan = buildPlan(S.docs, S.extractions, S.home, condition);
  const usedLive = Object.values(S.sourceOf).includes('live');
  if (S.docs.every((d) => d.sample) && usedLive) {
    S.keyPlan = buildPlan(S.docs, CACHED_EXTRACTIONS, S.home, condition);
    S.golden = compareWithKey(S.plan, S.keyPlan);
  } else if (usedLive && Object.values(S.extractions).some((x) => /NRCI-DEMO-2041/i.test(x?.patient?.reg_no || ''))) {
    // The family photographed the printed sample papers: check the live reading against the hand-made answer key
    S.keyPlan = buildPlan(SAMPLE_DOCS.map((d) => ({ ...d, sample: true })), CACHED_EXTRACTIONS, S.home, condition);
    S.golden = compareWithKey(S.plan, S.keyPlan); S.golden.printed = true;
  } else S.golden = null;
  S.index = buildIndex(S.docs);
  if (!S.dates.discharge) { const ds = S.docs.find((d) => (S.extractions[d.id]?.doc_type) === 'discharge_summary'); if (ds) S.dates.discharge = ds.date; }
  advance(5); S.proc.finished = true; clearInterval(timer);
  await new Promise((r) => setTimeout(r, 600));
  if (S.screen === 'reading') go('checklist');
}

// ---------------- Files out: downloads capability, else a normal download, else copy ----------------
async function saveFile(filename, data, mime) {
  try {
    if (window.claude && window.claude.use) { const dl = await window.claude.use('downloads'); if (dl) { await dl.save({ filename, data }); toast(L('Saved', 'सेव हुआ')); return; } }
  } catch (e) { if (e && e.code === 'declined') return; }
  try {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: mime })); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); return;
  } catch (e) { /* sandboxed */ }
  try { await navigator.clipboard.writeText(data); toast(L('Download is blocked here, so I copied it instead.', 'डाउनलोड रुका है, इसलिए कॉपी कर दिया।')); } catch (e) { toast(L('Could not save the file here.', 'फ़ाइल यहां सेव नहीं हो सकी।')); }
}

// ---------------- Actions ----------------
function loadSample() {
  S.docs = SAMPLE_DOCS.map((d) => ({ ...d, sample: true }));
  S.home = SAMPLE_HOME.map((h) => ({ ...h }));
  S.isSample = true; S.dates = { discharge: D.d1, treatEnd: RT_END };
  S.index = buildIndex(S.docs);
}
const ACTIONS = {
  home: () => go(S.plan ? 'plan' : 'landing'),
  lang: () => { S.lang = S.lang === 'en' ? 'hi' : 'en'; render(); },
  simple: () => { S.simple = !S.simple; render(); },
  go: (el) => { if (el.dataset.to === 'plan' && S.screen === 'plan') { S.tab = 'today'; } go(el.dataset.to); },
  sample: () => { S.condition = 'auto'; loadSample(); go('upload'); },
  loadSample: () => { loadSample(); render(); },
  cond: (el) => { S.condition = el.dataset.k; render(); },
  rmdoc: (el) => { S.docs = S.docs.filter((d) => d.id !== el.dataset.id); render(); },
  process: () => runProcessing(),
  skipLive: () => { S.proc.cancel = true; S.useLive = false; render(); },
  tab: (el) => { if (S.screen !== 'plan') S.screen = 'plan'; S.tab = el.dataset.k; render(); },
  tick: (el) => { S.ticks[el.dataset.k] = !S.ticks[el.dataset.k]; render(); },
  extick: (el) => { S.exTicks[el.dataset.k] = !S.exTicks[el.dataset.k]; render(); },
  src: (el) => { const r = S.srcReg[Number(el.dataset.i)]; if (r) { S.sheet = { kind: 'doc', doc: r.doc, quote: r.quote }; render(); } },
  opendoc: (el) => { S.sheet = { kind: 'doc', doc: el.dataset.id, quote: S.vaultQ ? (search(S.index, S.vaultQ, 1)[0]?.c.text.split('\n').find((l) => tokenize(l).some((w) => tokenize(S.vaultQ).includes(w))) || '') : '' }; render(); },
  close: () => { S.sheet = null; render(); },
  more: () => { S.sheet = { kind: 'more' }; render(); },
  restart: () => { Object.assign(S, { screen: 'landing', docs: [], extractions: {}, sourceOf: {}, plan: null, keyPlan: null, golden: null, home: [], tab: 'today', pick: {}, ticks: {}, exTicks: {}, chat: [], visitQs: [], sheet: null, proc: null, condition: 'auto', dates: { discharge: '', treatEnd: '' }, vaultSel: {}, vaultQ: '' }); upCount = 0; render(); },
  addq: (el) => { const q = el.dataset.q; if (!S.visitQs.includes(q)) S.visitQs.push(q); toast(L('Added to visit questions', 'पूछने की सूची में जोड़ा')); },
  qty: (el) => { const h = S.home[Number(el.dataset.i)]; const step = h.unit === 'tablets' || h.unit === 'capsules' ? 1 : 0.5; h.qty = Math.max(0, Math.round((h.qty + step * Number(el.dataset.d)) * 10) / 10); S.plan = buildPlan(S.docs, S.extractions, S.home, S.condition === 'auto' ? null : S.condition); render(); },
  waNow: () => waSend(waMessages()),
  waLater: () => { const m = waMessages()[0]; const to = document.getElementById('wato')?.value; if (to) WA.to = to; WA.status = L('Reminder scheduled for 1 minute from now. Carry on with the demo.', '1 मिनट बाद रिमाइंडर जाएगा।'); WA.timer = setTimeout(() => { WA.timer = null; waSend([m], L('Medicine reminder sent', 'दवा रिमाइंडर भेजा')); }, 60000); render(); },
  sampleBox: () => { S.home = SAMPLE_HOME.map((h) => ({ ...h })); S.plan = buildPlan(S.docs, S.extractions, S.home, S.condition === 'auto' ? null : S.condition); render(); },
  addmed: () => { const v = document.getElementById('newmed').value.trim(); if (!v) return; S.home.push({ name: v, salt: normaliseSalt(v).salt, qty: 10, unit: 'tablets' }); S.plan = buildPlan(S.docs, S.extractions, S.home, S.condition === 'auto' ? null : S.condition); render(); },
  pick: (el) => { S.pick[el.dataset.k] = Number(el.dataset.i); render(); },
  order: (el) => { S.sheet = { kind: 'order', id: 100000 + Math.floor(Math.random() * 899999), total: Number(el.dataset.total) }; render(); },
  askq: (el) => doAsk(el.dataset.q),
  icsAll: () => saveFile('homebridge-reminders.ics', buildICS(buildReminders(S.plan, buildCart(S.plan, S.home))), 'text/calendar'),
  ics1: (el) => saveFile('homebridge-' + el.dataset.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.ics', buildICS([{ kind: 'visit', date: el.dataset.due, title: el.dataset.name }]), 'text/calendar'),
  copyPrep: async () => { const pt = prepText(); const txt = pt.sections.map(([h, it]) => it.length ? `${h.toUpperCase()}\n${it.map((x) => '- ' + x).join('\n')}` : '').filter(Boolean).join('\n\n'); try { await navigator.clipboard.writeText(txt); toast(t('copied')); } catch (e) { toast(L('Copy is blocked here.', 'कॉपी यहां रुका है।')); } },
  dlPrep: () => { const pt = prepText(); const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Visit prep</title></head><body style="font-family:sans-serif;max-width:720px;margin:24px auto"><h1>Visit prep — HomeBridge</h1>${pt.next ? `<p><b>${pt.next.name}</b>, ${fmtDate(pt.next.due)}</p>` : ''}${pt.sections.map(([h, it]) => it.length ? `<h3>${h}</h3><ul>${it.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '').join('')}<p style="color:#888">Synthetic demo data. Generated ${fmtDate(T_ISO)}.</p></body></html>`; saveFile('visit-prep.html', html, 'text/html'); },
  vtype: (el) => { S.vaultType = el.dataset.k; render(); },
  pack: () => { const ids = Object.keys(S.vaultSel).filter((k) => S.vaultSel[k]); const txt = ids.map((id) => { const d = docOf(id); return `===== ${d.id} · ${d.title} · ${fmtDate(d.date)} =====\n${d.text || '[image]'}`; }).join('\n\n'); saveFile('homebridge-papers.txt', txt, 'text/plain'); },
};
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-a]'); if (!el) return;
  if (el.dataset.a === 'close' && e.target.closest('.sheet') && !e.target.closest('button[data-a="close"]')) return;
  const fn = ACTIONS[el.dataset.a]; if (fn) { e.preventDefault(); fn(el, e); }
});
document.addEventListener('submit', (e) => { const f = e.target.closest('[data-form="ask"]'); if (!f) return; e.preventDefault(); const i = document.getElementById('askin'); const q = i.value; i.value = ''; doAsk(q); });
document.addEventListener('input', (e) => {
  const k = e.target.dataset.in; if (!k) return;
  if (k === 'vaultQ') { S.vaultQ = e.target.value; const pos = e.target.selectionStart; render(); const n = document.querySelector('[data-in="vaultQ"]'); n.focus(); n.setSelectionRange(pos, pos); }
});
document.addEventListener('change', (e) => {
  const k = e.target.dataset.in; if (!k) return;
  if (k === 'dDis') S.dates.discharge = e.target.value; else if (k === 'dEnd') S.dates.treatEnd = e.target.value;
  else if (k === 'useLive') S.useLive = e.target.checked;
  else if (k === 'wato') WA.to = e.target.value;
  else if (k === 'rPat') S.reminderFor.patient = e.target.checked; else if (k === 'rCare') S.reminderFor.caregiver = e.target.checked;
  else if (k === 'vsel') S.vaultSel[e.target.dataset.id] = e.target.checked;
  if (k !== 'vsel') render();
});

render();
AI.init().then(() => { S.useLive = AI.live; render(); });

// ---------- Transparency: how HomeBridge decides ----------
function scrRules() {
  const nChunks = S.index ? S.index.N : 0;
  const kb = [
    ['🗂️', L('Your own papers (the vault)', 'आपके अपने कागज़'), L(`${S.docs.length} papers split into ${nChunks} searchable passages. The only source for answers.`, `${S.docs.length} कागज़, ${nChunks} खोजने लायक हिस्से। जवाब सिर्फ इन्हीं से।`)],
    ['💊', L('Medicine catalogue', 'दवा कैटलॉग'), L(`${CATALOGUE.length} products with pack sizes and illustrative prices (1mg online, Jan Aushadhi, local chemist).`, `${CATALOGUE.length} दवाएं, पैक और उदाहरण कीमतें।`)],
    ['🔤', L('Brand-to-salt dictionary', 'ब्रांड से सॉल्ट'), L(`${Object.keys(SALT_DICTIONARY).length} brand and generic names mapped to their salt, so “Dolo” and “Paracetamol” count as one medicine.`, `${Object.keys(SALT_DICTIONARY).length} नाम, ताकि Dolo और Paracetamol एक ही गिने जाएं।`)],
    ['🟡', L('Medicine guide', 'दवा गाइड'), L(`${Object.keys(MED_INFO).length} medicines with what they are for and what they look like (“white long tablet”).`, `${Object.keys(MED_INFO).length} दवाएं: किसलिए हैं और कैसी दिखती हैं।`)],
    ['📋', L('Condition checklists', 'बीमारी की चेकलिस्ट'), L(`${Object.keys(JOURNEYS).length} templates (${Object.values(JOURNEYS).map((j) => j.items.length).join(' + ')} items) written from published patient guidelines.`, `${Object.keys(JOURNEYS).length} चेकलिस्ट, प्रकाशित गाइडलाइन से।`)],
    ['🔁', L('Synonyms, English and Hindi', 'पर्यायवाची, अंग्रेज़ी और हिंदी'), L(`${Object.keys(SYNONYMS).length} word groups, e.g. gargle = mouthwash, थायराइड = TSH.`, `${Object.keys(SYNONYMS).length} शब्द-समूह, जैसे कुल्ला = mouthwash।`)],
  ];
  const planRules = [
    [L('Safety rules always win', 'सुरक्षा नियम सबसे ऊपर'), L('Never invent a medicine, dose, date or test. Stop a medicine only when a paper says so. Anything unclear goes to “Ask doctor”. No diagnosis or dose advice.', 'कुछ भी गढ़ा नहीं जाता। दवा तभी बंद जब कागज़ पर लिखा हो। जो साफ नहीं, वह “डॉक्टर से पूछें” में।')],
    [L('The paper’s own words', 'कागज़ पर लिखा शब्द'), L('Every item must carry a word-for-word quote from its page. A written instruction beats the AI’s reading of it.', 'हर बात के साथ कागज़ की हूबहू लाइन। लिखा हुआ, AI की समझ से ऊपर।')],
    [L('Newest paper wins', 'नया कागज़ मान्य'), L('For the same medicine (matched by salt), the most recent dated paper decides. Example: D3 restarted Pantoprazole, newer D4 stops it, so it is stopped.', 'एक ही दवा पर सबसे नई तारीख वाला कागज़ फैसला करता है।')],
    [L('Duration on the paper', 'कागज़ पर लिखी अवधि'), L('“x 30 days” ends the course; “long term” keeps it; “SOS” means only when needed. No duration = flagged, and 30 days is assumed only for buying.', '“x 30 दिन” पर कोर्स खत्म; “long term” चालू; “SOS” ज़रूरत पर।')],
    [L('Medicine box at home', 'घर का दवा डिब्बा'), L('Only reduces what you need to buy. It never adds a medicine to the plan; a box item on no paper goes to “Ask doctor”.', 'सिर्फ खरीदने की मात्रा घटाता है; योजना में दवा नहीं जोड़ता।')],
    [L('Condition checklist', 'बीमारी की चेकलिस्ट'), L('Only creates questions for the doctor, never instructions.', 'सिर्फ डॉक्टर के लिए सवाल बनाती है, निर्देश नहीं।')],
  ];
  const askRules = [
    [L('Advice check first', 'पहले सलाह की जांच'), L('Questions about stopping, skipping or changing a dose are not answered. They go to your visit questions.', 'दवा बंद/बदलने के सवालों का जवाब नहीं, वे डॉक्टर की सूची में।')],
    [L('The plan next', 'फिर योजना'), L('Dates, current medicines and bill totals come from the reconciled plan.', 'तारीख, चालू दवाएं, बिल योजना से।')],
    [L('Then search your pages', 'फिर कागज़ों में खोज'), L('Each passage is scored; the top 5 go to the AI, which may answer only from them and must cite the paper, like [D3].', 'हर हिस्से को अंक; टॉप 5 से ही जवाब, हवाले के साथ।')],
    [L('No match, no answer', 'मेल नहीं तो जवाब नहीं'), L('If the best passage covers less than 60% of your question’s words, the answer is “Not in your papers”.', '60% से कम मेल पर “कागज़ों में नहीं”।')],
  ];
  const weights = [
    [L('Exact word from your question', 'सवाल का हूबहू शब्द'), '1.0'], [L('Synonym (gargle → mouthwash)', 'पर्यायवाची'), '0.6'],
    [L('Newer page boost', 'नए कागज़ को बढ़त'), L('up to +25%, halves in ~30 days', '+25% तक')], [L('Keyword scoring (BM25)', 'कीवर्ड स्कोर (BM25)'), 'k1 1.4 · b 0.75'],
    [L('Passages sent to the AI', 'AI को भेजे हिस्से'), '5'], [L('Minimum match to answer', 'जवाब के लिए न्यूनतम मेल'), '60%'],
    [L('Cart choice', 'कार्ट का चुनाव'), L('same salt + strength, then lowest total', 'वही सॉल्ट और ताकत, फिर सबसे सस्ता')], [L('AI temperature for extraction', 'AI तापमान'), '0'],
  ];
  const ol = (rows) => `<ol class="rules">${rows.map(([h, b], i) => `<li><span class="rn">${i + 1}</span><div><b>${esc(h)}</b><div class="small muted">${esc(b)}</div></div></li>`).join('')}</ol>`;
  return `<div class="screen fade"><div class="h1">${esc(t('rulesT'))}</div><p class="sub">${esc(L('What the AI looks things up in, which rule wins when two disagree, and the weights used to pick answers.', 'AI कहां से देखता है, कौन सा नियम ऊपर है, और जवाब चुनने के वज़न।'))}</p>
    <div class="group-h">${esc(L('Knowledge bases', 'ज्ञान-स्रोत'))}</div><div class="card">${kb.map(([ic, h, b]) => `<div class="li"><span class="em">${ic}</span><div><b>${esc(h)}</b><div class="small muted">${esc(b)}</div></div></div>`).join('')}</div>
    <div class="group-h">${esc(L('Building the plan: rules in priority order', 'योजना बनाने के नियम, प्राथमिकता से'))}</div><div class="card">${ol(planRules)}</div>
    <div class="group-h">${esc(L('Answering a question', 'सवाल का जवाब'))}</div><div class="card">${ol(askRules)}</div>
    <div class="group-h">${esc(L('Weights and thresholds', 'वज़न और सीमाएं'))}</div><div class="card"><table class="t">${weights.map(([a, b]) => `<tr><td>${esc(a)}</td><td class="r"><b>${esc(b)}</b></td></tr>`).join('')}</table></div>
  </div>`;
}
