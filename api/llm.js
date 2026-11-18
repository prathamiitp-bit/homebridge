// POST /api/llm — the only server code. Keeps the AI key on the server.
// Body: { prompt: string, images?: [{ mime, data(base64) }] }  or  { ping: true }
// Uses Claude if ANTHROPIC_API_KEY is set, otherwise Gemini if GEMINI_API_KEY is set.

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 120;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const anthropic = process.env.ANTHROPIC_API_KEY, gemini = process.env.GEMINI_API_KEY;
  const body = req.body || {};
  if (body.ping) return res.status(200).json({ ok: !!(anthropic || gemini), model: anthropic ? 'Claude (server)' : gemini ? 'Gemini (server)' : null });
  if (!anthropic && !gemini) return res.status(503).json({ error: 'No AI key configured on the server.' });
  const ip = String(req.headers['x-forwarded-for'] || 'local').split(',')[0];
  if (limited(ip)) return res.status(429).json({ error: 'Too many requests. Try again later or use the sample.' });
  const prompt = String(body.prompt || '').slice(0, 60000);
  const images = (Array.isArray(body.images) ? body.images : []).slice(0, 4).filter((i) => /^image\/(jpeg|png|webp)$/.test(i.mime) && i.data && i.data.length < 7e6);
  try {
    if (anthropic) {
      const content = [...images.map((i) => ({ type: 'image', source: { type: 'base64', media_type: i.mime, data: i.data } })), { type: 'text', text: prompt }];
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': anthropic, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', max_tokens: 4000, temperature: 0, messages: [{ role: 'user', content }] }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error?.message || `Claude ${r.status}`);
      return res.status(200).json({ text: (j.content || []).map((c) => c.text || '').join('') });
    }
    const parts = [{ text: prompt }, ...images.map((i) => ({ inline_data: { mime_type: i.mime, data: i.data } }))];
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': gemini },
      body: JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig: { temperature: 0 } }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error?.message || `Gemini ${r.status}`);
    return res.status(200).json({ text: (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('') });
  } catch (e) {
    return res.status(502).json({ error: 'The AI could not finish this time.', detail: String(e.message || e).slice(0, 200) });
  }
}
