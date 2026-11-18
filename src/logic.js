// ============================================================
// HomeBridge — AI pipeline, rules engine and plan builder
// The model reads and extracts; code decides status, dates and quantities.
// ============================================================

const norm = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9ऀ-ॿ%.]+/g, ' ').trim();
const squash = (s = '') => String(s).toLowerCase().replace(/\s+/g, ' ').trim();

// ---------- Normalise: name -> salt (code first, AI suggestion as fallback) ----------
function normaliseSalt(name = '', aiSalt = '') {
  const n = norm(name);
  for (const k of Object.keys(SALT_DICTIONARY).sort((a, b) => b.length - a.length)) {
    if (n.includes(k)) return { salt: SALT_DICTIONARY[k], matched: 'catalogue' };
  }
  const c = CATALOGUE.find((x) => n.includes(norm(x.salt)));
  if (c) return { salt: c.salt, matched: 'catalogue' };
  if (aiSalt) return { salt: aiSalt, matched: 'ai' };
  return { salt: name || 'Unknown', matched: 'none' };
}
const saltKey = (s) => norm(s).replace(/\s+/g, '');

function unitsPerDay(pattern) {
  if (!pattern) return null;
  const p = String(pattern).replace(/½/g, '0.5').split(/[-–]/).map((x) => parseFloat(x));
  if (!p.length || p.some((x) => Number.isNaN(x))) return null;
  return p.reduce((a, b) => a + b, 0);
}

function detectCondition(extractions) {
  const votes = {};
  for (const e of extractions) if (e && e.condition) votes[e.condition] = (votes[e.condition] || 0) + 1;
  const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  if (best && JOURNEYS[best[0]]) return best[0];
  const text = squash(extractions.map((e) => JSON.stringify(e?.diagnosis || [])).join(' '));
  if (/tongue|oral|glossectomy|head and neck|larynx|buccal/.test(text)) return 'head_neck_cancer';
  if (/myocardial|angioplasty|stemi|coronary|heart attack|ptca/.test(text)) return 'heart_attack';
  return 'general';
}

// ---------- Reconcile: build the one current plan from every document ----------
function buildPlan(docs, extractions, home, journeyKey) {
  const byId = Object.fromEntries(docs.map((d) => [d.id, d]));
  const ordered = docs.filter((d) => extractions[d.id]).sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.id.localeCompare(b.id));
  const exOf = (d) => extractions[d.id];
  const condition = journeyKey || detectCondition(ordered.map(exOf));
  const medDocs = ordered.filter((d) => (exOf(d).medicines || []).length);
  const newestMedDoc = medDocs[medDocs.length - 1];

  // 1. Medicines, keyed on salt; newest document wins
  const hist = {};
  for (const d of ordered) {
    for (const m of exOf(d).medicines || []) {
      const { salt, matched } = normaliseSalt(m.name, m.salt);
      const key = saltKey(salt);
      (hist[key] = hist[key] || { salt, matched, mentions: [] }).mentions.push({ ...m, doc: d.id, date: d.date });
    }
  }
  const meds = [];
  for (const key of Object.keys(hist)) {
    const { salt, matched, mentions } = hist[key];
    const last = mentions[mentions.length - 1];
    const notes = [];
    let current = null;
    for (const m of mentions) {
      if (m.action === 'stop') { current = null; continue; }
      const base = current || {};
      current = {
        ...base,
        name: m.name || base.name, form: m.form || base.form,
        strength: m.strength || base.strength,
        dose_pattern: m.dose_pattern || (m.action === 'continue' ? base.dose_pattern : null) || (m.sos ? null : base.dose_pattern),
        timing: m.timing || base.timing,
        sos: !!m.sos, then_sos: !!m.then_sos, long_term: !!m.long_term || (m.action === 'continue' && base.long_term),
        duration_days: m.action === 'continue' ? (m.duration_days ?? base.duration_days ?? null) : (m.duration_days ?? null),
        start: m.action === 'continue' && base.start ? base.start : m.date,
        doc: m.doc, quote: m.quote, prev: base.name ? { strength: base.strength, dose_pattern: base.dose_pattern, doc: base.doc } : null,
      };
    }
    let status, daysLeft = null, endDate = null;
    if (last.action === 'stop') {
      status = 'STOPPED';
      const earlier = mentions.filter((m) => m.action !== 'stop');
      const lastStart = earlier[earlier.length - 1];
      if (lastStart && lastStart.doc !== mentions[0].doc) notes.push({ kind: 'conflict', en: `${lastStart.doc} restarted it; the newer ${last.doc} stops it. The newest document wins.`, hi: `${lastStart.doc} में फिर शुरू की गई थी; नए ${last.doc} में बंद की गई। नया पर्चा मान्य है।` });
      else notes.push({ kind: 'info', en: `${last.doc} says to stop it.`, hi: `${last.doc} में इसे बंद करने को कहा गया है।` });
      current = { ...(mentions.filter((m) => m.action !== 'stop').slice(-1)[0] || last), doc: last.doc, quote: last.quote };
    } else if (current.sos) {
      status = 'ACTIVE';
    } else if (current.long_term) {
      status = 'ACTIVE';
    } else if (current.duration_days) {
      endDate = addDaysIso(current.start, current.duration_days);
      daysLeft = daysBetween(T_ISO, endDate);
      if (daysLeft <= 0) {
        if (current.then_sos) { status = 'ACTIVE'; current.sos = true; current.dose_pattern = null; }
        else status = 'COMPLETE';
      } else status = 'ACTIVE';
    } else {
      status = 'ACTIVE';
      notes.push({ kind: 'unclear', en: 'Duration not specified on the paper. Ask how long to continue.', hi: 'पर्चे में अवधि नहीं लिखी है। पूछें कि कब तक लेनी है।' });
    }
    const firstDoc = mentions[0].doc;
    if (status === 'ACTIVE' && newestMedDoc && firstDoc === newestMedDoc.id && mentions.length === 1) status = 'NEW';
    if (status === 'ACTIVE' && current.prev && ((current.prev.strength && current.strength && saltKey(current.prev.strength) !== saltKey(current.strength)) || (current.prev.dose_pattern && current.dose_pattern && current.prev.dose_pattern !== current.dose_pattern))) status = 'CHANGED';
    meds.push({
      key, salt, matched, status, daysLeft, endDate,
      name: current.name || last.name, strength: current.strength, form: current.form, dose_pattern: current.sos ? null : current.dose_pattern,
      timing: current.timing, sos: !!current.sos, long_term: !!current.long_term, duration_days: current.duration_days,
      source: { doc: current.doc || last.doc, quote: current.quote || last.quote }, mentions, notes, prev: current.prev,
      needs_clarification: notes.some((n) => n.kind === 'unclear'),
    });
  }
  // 2. Medicine box: anything at home that no paper mentions goes to Ask doctor
  for (const h of home) {
    const key = saltKey(normaliseSalt(h.name, h.salt).salt);
    const m = meds.find((x) => x.key === key);
    if (m) { m.home = h; continue; }
    meds.push({
      key, salt: h.salt || h.name, status: 'ASK_DOCTOR', name: h.name, home: h, form: h.unit, mentions: [], dose_pattern: null, sos: false,
      source: { doc: 'HOME', quote: `Medicine box: ${h.name} (${h.qty} ${h.unit})` },
      notes: [{ kind: 'unclear', en: 'At home, but not on any of your papers. Ask the doctor before giving it.', hi: 'घर पर है, पर किसी भी पर्चे में नहीं लिखी। देने से पहले डॉक्टर से पूछें।' }],
      needs_clarification: true,
    });
  }
  const order = { NEW: 0, CHANGED: 1, ACTIVE: 2, ASK_DOCTOR: 3, STOPPED: 4, COMPLETE: 5 };
  meds.sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name));

  // 3. Visits: one per department, the newest document's instruction wins
  const visitMap = {};
  for (const d of ordered) for (const v of exOf(d).visits || []) {
    const key = norm(v.department).replace(/\bopd\b/g, '').trim();
    const due = v.due_date || (v.due_in_days != null ? addDaysIso(d.date, v.due_in_days) : null);
    visitMap[key] = { name: v.department, due, source: { doc: d.id, quote: v.quote }, kind: 'visit' };
  }
  // 4. Tests and scans; intervals restart from the latest result
  const results = [];
  for (const d of ordered) for (const r of exOf(d).results || []) results.push({ ...r, doc: d.id, date: d.date });
  const tests = [];
  for (const d of ordered) for (const t of exOf(d).tests || []) {
    let due = t.due_date || (t.due_in_days != null ? addDaysIso(d.date, t.due_in_days) : null);
    let basis = null;
    if (!due && t.interval_months) {
      const k = norm(t.name).split(' ')[0];
      const lastR = results.filter((r) => norm(r.test).includes(k)).sort((a, b) => b.date.localeCompare(a.date))[0];
      const from = lastR ? lastR.date : d.date;
      due = addDaysIso(from, Math.round(t.interval_months * 30.34));
      basis = lastR ? { doc: lastR.doc, date: lastR.date } : null;
    }
    tests.push({ name: t.name, due, interval_months: t.interval_months, prep: t.prep, basis, source: { doc: d.id, quote: t.quote }, kind: 'test' });
  }
  const visits = Object.values(visitMap);
  const timeline = [...visits, ...tests].filter((x) => x.due).sort((a, b) => a.due.localeCompare(b.due));

  // 5. Lists that merge across documents
  const merge = (field) => {
    const out = [];
    for (const d of ordered) for (const it of exOf(d)[field] || []) {
      const ex = out.find((o) => squash(o.en).replace(/[^a-z]/g, '') === squash(it.en).replace(/[^a-z]/g, ''));
      if (ex) ex.sources.push({ doc: d.id, quote: it.quote }); else out.push({ ...it, sources: [{ doc: d.id, quote: it.quote }] });
    }
    return out;
  };
  const bills = [];
  for (const d of ordered) for (const b of exOf(d).bills || []) bills.push({ ...b, doc: d.id, date: d.date });
  const contacts = [];
  for (const d of ordered) for (const c of exOf(d).contacts || []) contacts.push({ ...c, doc: d.id });
  const diagnosis = [], treatment = [];
  for (const d of ordered) {
    for (const x of exOf(d).diagnosis || []) diagnosis.push({ ...x, doc: d.id, date: d.date });
    for (const x of exOf(d).treatment || []) treatment.push({ ...x, doc: d.id, date: d.date });
  }
  const patient = ordered.map((d) => exOf(d).patient).find(Boolean) || {};

  const plan = {
    condition, meds, visits, tests, timeline, results, bills, contacts, diagnosis, treatment, patient,
    diet: merge('diet'), precautions: merge('precautions'), exercises: merge('exercises'), warning_signs: merge('warning_signs'),
    reports: ordered.filter((d) => ['histopathology', 'lab_report', 'imaging'].includes(d.type) || ['histopathology', 'lab_report', 'imaging'].includes(exOf(d).doc_type))
      .map((d) => ({ doc: d.id, date: d.date, title: d.title, summary_en: exOf(d).summary_en, summary_hi: exOf(d).summary_hi, results: exOf(d).results || [] })),
    docSummaries: Object.fromEntries(ordered.map((d) => [d.id, { en: exOf(d).summary_en, hi: exOf(d).summary_hi }])),
  };
  plan.gaps = findGaps(plan, docs, extractions);
  return plan;
}

// ---------- Gaps: compare the plan with the condition's checklist ----------
function expandKeys(keys) {
  const out = new Set(keys);
  for (const k of keys) for (const s of SYNONYMS[k] || []) out.add(s);
  return [...out];
}
function findGaps(plan, docs, extractions) {
  const j = JOURNEYS[plan.condition] || JOURNEYS.general;
  const corpus = squash(Object.values(extractions).map((e) => JSON.stringify([e.medicines, e.visits, e.tests, e.diet, e.precautions, e.exercises, e.warning_signs].map((a) => (a || []).map((x) => x.quote || x.en || x.name)))).join(' '));
  const items = j.items.map((it) => {
    const keys = expandKeys(it.keys);
    const hit = keys.find((k) => corpus.includes(k));
    return { ...it, status: hit ? 'FOUND' : 'NOT_FOUND', matched: hit || null };
  });
  const typesPresent = new Set(docs.map((d) => extractions[d.id]?.doc_type || d.type));
  const docsCheck = j.docs.map((x) => {
    let status = typesPresent.has(x.type) ? 'FOUND' : 'NOT_FOUND';
    if (status === 'NOT_FOUND' && x.type === 'imaging' && plan.tests.some((t) => /pet|scan|ct|mri/i.test(t.name) && t.due > T_ISO)) status = 'NOT_YET';
    return { ...x, status };
  });
  const conflicts = plan.meds.filter((m) => m.notes.some((n) => n.kind === 'conflict'));
  return { journey: plan.condition, items, docs: docsCheck, conflicts };
}

// ---------- Cart: only what is missing, cheapest same salt and strength ----------
function catalogueOptions(salt, strength) {
  const s = saltKey(salt);
  const opts = CATALOGUE.filter((c) => saltKey(c.salt) === s && (!strength || !c.strength || saltKey(c.strength) === saltKey(strength) || c.days_per_pack));
  return opts.length ? opts : CATALOGUE.filter((c) => saltKey(c.salt) === s);
}
function buildCart(plan, home, horizon = 30) {
  const lines = [], sos = [];
  for (const m of plan.meds) {
    if (!['ACTIVE', 'NEW', 'CHANGED'].includes(m.status)) continue;
    const opts = catalogueOptions(m.salt, m.strength);
    const have = home.find((h) => saltKey(normaliseSalt(h.name, h.salt).salt) === m.key);
    if (m.sos) { sos.push({ med: m, have, opts }); continue; }
    const days = m.long_term || !m.duration_days ? horizon : Math.min(horizon, Math.max(0, m.daysLeft ?? horizon));
    if (!opts.length) { lines.push({ med: m, days, note: 'not_in_catalogue', have }); continue; }
    const tablet = opts[0].per_pack != null;
    let needUnits, haveUnits, packs;
    if (tablet) {
      const perDay = unitsPerDay(m.dose_pattern);
      if (!perDay) { lines.push({ med: m, days, note: 'dose_missing', have }); continue; }
      needUnits = Math.ceil(perDay * days); haveUnits = have ? Number(have.qty) || 0 : 0;
      const buy = Math.max(0, needUnits - haveUnits);
      if (!buy) continue;
      packs = Math.ceil(buy / opts[0].per_pack);
    } else {
      const packsNeeded = days / opts[0].days_per_pack; haveUnits = have ? Number(have.qty) || 0 : 0;
      packs = Math.max(0, Math.ceil(packsNeeded - haveUnits - 1e-9));
      needUnits = Math.ceil(packsNeeded * 10) / 10;
      if (!packs) continue;
    }
    const offers = [];
    for (const o of opts) for (const [ch, price] of [['online', o.online], ['jan', o.jan], ['local', o.local]]) if (price != null) offers.push({ product: o.product, pack: o.pack, channel: ch, unit: price, total: price * packs });
    offers.sort((a, b) => a.total - b.total);
    lines.push({ med: m, days, tablet, needUnits, haveUnits, packs, offers, have, flag: m.needs_clarification });
  }
  const removeFromBox = home.filter((h) => {
    const m = plan.meds.find((x) => x.key === saltKey(normaliseSalt(h.name, h.salt).salt));
    return m && (m.status === 'STOPPED' || m.status === 'COMPLETE');
  });
  const onHold = plan.meds.filter((m) => m.status === 'ASK_DOCTOR');
  return { lines, sos, removeFromBox, onHold, horizon };
}

// ---------- Today and reminders ----------
const SLOTS = ['morning', 'afternoon', 'night'];
function buildToday(plan) {
  const slots = { morning: [], afternoon: [], night: [] };
  for (const m of plan.meds) {
    if (!['ACTIVE', 'NEW', 'CHANGED'].includes(m.status) || m.sos || !m.dose_pattern) continue;
    String(m.dose_pattern).split('-').slice(0, 3).forEach((n, i) => { if (parseFloat(n) > 0) slots[SLOTS[i]].push(m); });
  }
  const next = plan.timeline.filter((x) => x.due >= T_ISO);
  return { slots, nextVisit: next.find((x) => x.kind === 'visit'), nextTest: next.find((x) => x.kind === 'test'), next };
}
function buildReminders(plan, cart) {
  const r = [];
  const today = buildToday(plan);
  const times = { morning: '08:00', afternoon: '14:00', night: '21:00' };
  for (const s of SLOTS) if (today.slots[s].length) r.push({ kind: 'medicine', when: `Daily ${times[s]}`, time: times[s], slot: s, title: today.slots[s].map((m) => m.name).join(', '), meds: today.slots[s] });
  for (const e of plan.exercises.filter((x) => x.freq_per_day)) r.push({ kind: 'exercise', when: `${e.freq_per_day}× daily`, title: e.en, title_hi: e.hi, time: '10:00' });
  for (const t of plan.timeline.filter((x) => x.due >= T_ISO)) r.push({ kind: t.kind, when: t.due, title: t.name, date: t.due, prep: t.prep, source: t.source });
  for (const m of plan.meds.filter((m) => ['ACTIVE', 'NEW', 'CHANGED'].includes(m.status) && !m.sos && (m.long_term || !m.duration_days))) {
    const d = addDaysIso(T_ISO, 25);
    r.push({ kind: 'refill', when: d, date: d, title: `Refill check: ${m.name}` });
  }
  for (const b of plan.bills.filter((b) => b.claim_due && b.claim_due >= T_ISO)) r.push({ kind: 'claim', when: b.claim_due, date: b.claim_due, title: `File insurance claim (${b.what})` });
  return r;
}
function icsEscape(s) { return String(s).replace(/[,;\\]/g, (m) => '\\' + m).replace(/\n/g, '\\n'); }
function buildICS(reminders) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HomeBridge//Concept prototype//EN', 'CALSCALE:GREGORIAN'];
  let i = 0;
  for (const r of reminders) {
    i++;
    const uid = `hb-${i}-${Date.now()}@homebridge.demo`;
    if (r.kind === 'medicine' || r.kind === 'exercise') {
      const [h, m] = r.time.split(':');
      lines.push('BEGIN:VEVENT', `UID:${uid}`, `DTSTAMP:${stamp}`, `DTSTART:${T_ISO.replace(/-/g, '')}T${h}${m}00`, 'DURATION:PT10M', 'RRULE:FREQ=DAILY;COUNT=30', `SUMMARY:${icsEscape((r.kind === 'medicine' ? 'Medicines: ' : 'Exercise: ') + r.title)}`, 'BEGIN:VALARM', 'TRIGGER:-PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:HomeBridge reminder', 'END:VALARM', 'END:VEVENT');
    } else if (r.date) {
      const d = r.date.replace(/-/g, '');
      lines.push('BEGIN:VEVENT', `UID:${uid}`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${icsEscape(r.title)}`, `DESCRIPTION:${icsEscape((r.prep ? 'Prep: ' + r.prep + '. ' : '') + (r.source ? 'From ' + r.source.doc + ': ' + r.source.quote : 'HomeBridge'))}`, 'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Tomorrow', 'END:VALARM', 'END:VEVENT');
    }
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

// ---------- Retrieval for "Ask your documents" (RAG) ----------
function tokenize(s) { return norm(s).split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)); }
const STOP = new Set('the a an and or of to in on for with is are was be by at as it this that from after before what when which how much many does do did his her he she we our my me i you your'.split(' '));
function buildIndex(docs) {
  const chunks = [];
  for (const d of docs) {
    const parts = (d.text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    parts.forEach((p, i) => chunks.push({ id: `${d.id}·${i + 1}`, doc: d.id, title: d.title, date: d.date, text: p, toks: tokenize(p) }));
  }
  const df = {};
  for (const c of chunks) for (const w of new Set(c.toks)) df[w] = (df[w] || 0) + 1;
  const avg = chunks.reduce((s, c) => s + c.toks.length, 0) / Math.max(1, chunks.length);
  return { chunks, df, avg, N: chunks.length };
}
function expandQuery(q) {
  const base = tokenize(q);
  const extra = [];
  for (const w of [...base, ...q.split(/\s+/)]) for (const s of SYNONYMS[w] || SYNONYMS[norm(w)] || []) extra.push(...tokenize(s));
  return { base, extra };
}
function search(index, q, k = 5) {
  const { base, extra } = expandQuery(q);
  const terms = [...base.map((w) => [w, 1]), ...extra.map((w) => [w, 0.6])];
  const k1 = 1.4, b = 0.75;
  const scored = index.chunks.map((c) => {
    let s = 0;
    for (const [w, weight] of terms) {
      const tf = c.toks.filter((t) => t === w || (w.length > 4 && t.startsWith(w))).length;
      if (!tf) continue;
      const idf = Math.log(1 + (index.N - (index.df[w] || 0) + 0.5) / ((index.df[w] || 0) + 0.5));
      s += weight * idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * c.toks.length / index.avg));
    }
    const age = Math.max(0, daysBetween(c.date || T_ISO, T_ISO));
    return { c, s: s * (1 + 0.25 / (1 + age / 30)) };
  }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  return scored.slice(0, k);
}
const ADVICE_RE = /\b(should (i|he|she|we) (stop|increase|decrease|double|skip|reduce|change)|can (i|he|she|we) (stop|skip|take (extra|more|double))|increase (the )?dose|stop (the )?medicine|instead of)\b|बंद कर (दें|सकते)|डोज़ बढ़ा/i;

// ---------- AI adapter: Claude in the page, a server route, or the saved answer key ----------
const AI = {
  mode: 'checking', sample: null, label: '',
  async init() {
    try {
      if (window.claude && typeof window.claude.use === 'function') {
        const s = await Promise.race([window.claude.use('sample'), new Promise((r) => setTimeout(() => r(null), 10500))]);
        if (s) { this.sample = s; this.mode = 'claude'; this.label = 'Claude (live)'; return this.mode; }
      }
    } catch (e) { /* fall through */ }
    try {
      if (/^https?:/.test(location.protocol)) {
        const r = await fetch('api/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ping: true }) });
        if (r.ok) { const j = await r.json(); if (j.ok) { this.mode = 'server'; this.label = j.model || 'Server AI'; return this.mode; } }
      }
    } catch (e) { /* fall through */ }
    this.mode = 'offline'; this.label = 'Saved answer key';
    return this.mode;
  },
  get live() { return this.mode === 'claude' || this.mode === 'server'; },
  async ask(prompt, images = [], tier = 'default') {
    if (this.mode === 'claude') {
      const opts = { modelTier: tier, cache: false };
      if (images.length) {
        const lim = this.sample.limits ? await this.sample.limits() : { images: true };
        if (lim && lim.images) opts.images = images;
      }
      const r = await this.sample(prompt, opts);
      return r.text;
    }
    if (this.mode === 'server') {
      const imgs = await Promise.all(images.map(blobToBase64));
      const r = await fetch('api/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, images: imgs }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'AI request failed');
      return j.text;
    }
    throw new Error('offline');
  },
};
function blobToBase64(blob) {
  return new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res({ mime: blob.type || 'image/jpeg', data: String(fr.result).split(',')[1] }); fr.onerror = rej; fr.readAsDataURL(blob); });
}
function parseJSON(text) {
  try { return JSON.parse(text); } catch (e) { /* keep trying */ }
  const m = String(text).replace(/```json|```/g, '').match(/\{[\s\S]*\}/);
  if (m) return JSON.parse(m[0]);
  throw new Error('The AI did not return JSON');
}

const EXTRACT_PROMPT = `You read ONE hospital document for HomeBridge, an app that helps a family follow the plan after discharge. You do not give medical advice; you copy what the paper says into JSON.
Today is ${T_ISO}. Return ONLY JSON with exactly this shape:
{"doc_type":"discharge_summary|histopathology|rt_summary|prescription|lab_report|imaging|bill|other","doc_date":"YYYY-MM-DD|null","department":string|null,"condition":"head_neck_cancer|heart_attack|general|null",
"patient":{"name":string|null,"age_sex":string|null,"reg_no":string|null,"allergies":string|null}|null,
"diagnosis":[{"text":string,"quote":string}],"treatment":[{"text":string,"quote":string}],
"medicines":[{"name":string,"salt":string|null,"strength":string|null,"form":"tablet|capsule|mouthwash|gel|powder|syrup|injection|other","dose_pattern":"1-0-1"|null,"timing":string|null,"duration_days":number|null,"long_term":boolean,"sos":boolean,"then_sos":boolean,"action":"start|continue|stop|change","quote":string}],
"visits":[{"department":string,"due_in_days":number|null,"due_date":"YYYY-MM-DD"|null,"quote":string}],
"tests":[{"name":string,"due_in_days":number|null,"interval_months":number|null,"prep":string|null,"quote":string}],
"results":[{"test":string,"value":string,"flag":"low|high|normal|good|attention","quote":string}],
"diet":[{"en":string,"hi":string,"quote":string}],"precautions":[{"en":string,"hi":string,"quote":string}],
"exercises":[{"en":string,"hi":string,"freq_per_day":number|null,"quote":string}],"warning_signs":[{"en":string,"hi":string,"quote":string}],
"bills":[{"bill_no":string|null,"what":string,"amount":number,"payer":string|null,"claim_status":string|null,"quote":string}],
"contacts":[{"name":string,"phone":string|null,"quote":string}],
"summary_en":"one plain sentence for a worried family member","summary_hi":"the same sentence in simple Hindi (Devanagari)"}
Rules:
- dose_pattern is morning-afternoon-night counts. OD=1-0-0, BD=1-0-1, TDS=1-1-1, HS or bedtime=0-0-1. "x 5 days" -> duration_days 5. "long term"/"continue" with no end -> long_term true. "SOS"/"as needed" -> sos true. "x 5 days, then SOS" -> duration_days 5 and then_sos true.
- A bill or pharmacy receipt is not a prescription: put its amounts in bills (one entry per receipt with its total) and leave medicines empty.
- "Stop X" -> one medicine with action "stop". "Continue X" -> action "continue".
- due_in_days counts from the document's own date: "after 8 weeks" = 56, "in 1 month" = 30, "after 12 weeks" = 84. "every 6 months" -> interval_months 6.
- Every quote must be copied VERBATIM from the document (one line or part of a line). Never invent a medicine, dose, date, test or symptom; use null or leave the list empty.
- condition: head_neck_cancer for mouth, tongue, throat or larynx cancer; heart_attack for heart attack or angioplasty; otherwise general; null if the document does not say.`;

async function extractLive(doc, onStatus) {
  let prompt = EXTRACT_PROMPT, images = [];
  if (doc.text && doc.text.trim().length > 40) prompt += `\n\nDOCUMENT ${doc.id} (${doc.title}):\n"""\n${doc.text.slice(0, 20000)}\n"""`;
  else { images = doc.images || []; prompt += `\n\nThe document is attached as ${images.length} image(s). Read it carefully, including tables and handwriting.`; }
  const text = await AI.ask(prompt, images, 'default');
  const j = parseJSON(text);
  for (const k of ['diagnosis', 'treatment', 'medicines', 'visits', 'tests', 'results', 'diet', 'precautions', 'exercises', 'warning_signs', 'bills', 'contacts']) if (!Array.isArray(j[k])) j[k] = [];
  // Guard: quotes must exist in the text we have; unverifiable items are flagged, never silently trusted
  if (doc.text) {
    const body = squash(doc.text);
    for (const k of ['medicines', 'visits', 'tests']) for (const it of j[k]) it.quote_verified = !!it.quote && body.includes(squash(it.quote).slice(0, 40));
  }
  return j;
}

async function askLive(question, hits, plan, lang) {
  const ctx = hits.map((h) => `[${h.c.doc}] (${h.c.title}, ${paperDate(h.c.date)})\n${h.c.text}`).join('\n\n');
  const planBrief = JSON.stringify({
    medicines: plan.meds.map((m) => ({ name: m.name, status: m.status, dose: m.dose_pattern, sos: m.sos, timing: m.timing, from: m.source.doc })),
    upcoming: plan.timeline.filter((x) => x.due >= T_ISO).map((x) => ({ what: x.name, due: x.due, from: x.source.doc })),
  });
  const prompt = `You answer a family's question using ONLY their own hospital papers below and the reconciled plan. Today is ${T_ISO}.
Rules: answer in ${lang === 'hi' ? 'simple Hindi (Devanagari)' : 'plain English'}, at most 4 short sentences. After each fact put its source in square brackets like [D3]. If the papers do not answer it, reply exactly "NOT_IN_PAPERS". Never give medical advice, never suggest changing, starting or stopping a medicine; if asked, say it is a question for the doctor.
PLAN: ${planBrief}
PAPERS:
${ctx}
QUESTION: ${question}`;
  return (await AI.ask(prompt, [], 'quick')).trim();
}

// Offline answer: plan-aware shortcuts plus the best matching lines
function answerOffline(question, hits, plan, lang) {
  const q = norm(question);
  const L = (en, hi) => (lang === 'hi' ? hi : en);
  const fmt = (iso) => fmtDate(iso, lang);
  if (/pet|scan|स्कैन/.test(q)) { const t = plan.tests.find((x) => /pet|scan/i.test(x.name)); if (t) return { text: L(`The PET-CT is due on ${fmt(t.due)} [${t.source.doc}].`, `PET-CT ${fmt(t.due)} को होना है [${t.source.doc}]।`), cites: [t.source.doc] }; }
  if (/thyroid|tsh|थायराइड/.test(q)) { const t = plan.tests.find((x) => /tsh/i.test(x.name)); if (t) return { text: L(`The next thyroid test (TSH) is due on ${fmt(t.due)}, 6 months after the last one [${t.source.doc}${t.basis ? ', ' + t.basis.doc : ''}].`, `अगला थायराइड टेस्ट (TSH) ${fmt(t.due)} को है [${t.source.doc}]।`), cites: [t.source.doc] }; }
  if (/bill|cost|spen|money|paid|claim|खर्च|बिल/.test(q)) { const tot = plan.bills.reduce((s, b) => s + b.amount, 0); return { text: L(`Your papers show ${plan.bills.length} bills totalling ₹${inr(tot)} [${[...new Set(plan.bills.map((b) => b.doc))].join(', ')}].`, `आपके कागज़ों में ${plan.bills.length} बिल हैं, कुल ₹${inr(tot)}।`), cites: plan.bills.map((b) => b.doc) }; }
  if (/next (visit|appointment|opd)|doctor|डॉक्टर/.test(q)) { const v = plan.timeline.find((x) => x.kind === 'visit' && x.due >= T_ISO); if (v) return { text: L(`The next visit is ${v.name} on ${fmt(v.due)} [${v.source.doc}].`, `अगली विज़िट ${v.name}, ${fmt(v.due)} को [${v.source.doc}]।`), cites: [v.source.doc] }; }
  const terms = new Set([...expandQuery(question).base, ...expandQuery(question).extra]);
  const medHits = plan.meds.filter((m) => ['ACTIVE', 'NEW', 'CHANGED'].includes(m.status) && tokenize(`${m.name} ${m.form || ''} ${m.salt}`).some((w) => terms.has(w)));
  if (medHits.length) return { text: medHits.map((m) => L(`${m.name}: ${m.sos ? 'only when needed (SOS)' : m.dose_pattern}${m.timing ? ', ' + m.timing : ''}${m.daysLeft ? `, ${m.daysLeft} days left` : m.long_term ? ', long term' : ''} [${m.source.doc}].`, `${m.name}: ${m.sos ? 'ज़रूरत होने पर (SOS)' : m.dose_pattern}${m.timing ? ', ' + m.timing : ''} [${m.source.doc}]।`)).join(' '), cites: medHits.map((m) => m.source.doc) };
  if (!hits.length) return { text: 'NOT_IN_PAPERS', cites: [] };
  const top = hits[0].c;
  const base = tokenize(question).filter((w) => !['next', 'when', 'what', 'say', 'said', 'tell'].includes(w));
  const covered = base.filter((w) => top.toks.some((x) => x === w || x.startsWith(w)) || (SYNONYMS[w] || []).some((s) => top.toks.includes(norm(s)))).length;
  if (base.length && covered / base.length < 0.6) return { text: 'NOT_IN_PAPERS', cites: [] };
  const line = top.text.split('\n').find((l) => tokenize(l).some((w) => tokenize(question).includes(w))) || top.text.split('\n')[0];
  return { text: L(`Closest line in your papers: “${line.trim()}” [${top.doc}]`, `आपके कागज़ों में सबसे मिलती लाइन: “${line.trim()}” [${top.doc}]`), cites: [top.doc] };
}

// Golden check: compare a live plan's medicine statuses with the saved answer key
function compareWithKey(livePlan, keyPlan) {
  let match = 0, total = 0; const diffs = [];
  for (const k of keyPlan.meds) {
    total++;
    const l = livePlan.meds.find((m) => m.key === k.key);
    if (l && l.status === k.status) match++; else diffs.push({ name: k.name, key: k.status, live: l ? l.status : 'missing' });
  }
  return { match, total, diffs };
}

function inr(n) { return Number(n).toLocaleString('en-IN'); }
function fmtDate(iso, lang = 'en') {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function relDays(iso, lang = 'en') {
  const n = daysBetween(T_ISO, iso);
  if (lang === 'hi') return n === 0 ? 'आज' : n === 1 ? 'कल' : n > 0 ? `${n} दिन में` : `${-n} दिन पहले`;
  return n === 0 ? 'today' : n === 1 ? 'tomorrow' : n > 0 ? `in ${n} days` : `${-n} days ago`;
}
