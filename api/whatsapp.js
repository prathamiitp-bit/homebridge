// /api/whatsapp — sends HomeBridge reminders to a real WhatsApp number through Twilio.
// GET  -> { ok } tells the app whether sending is set up.
// POST { to: "+9198xxxxxxxx", messages: [string] } -> sends each message.
// Env: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, optional TWILIO_WHATSAPP_FROM (default: Twilio sandbox
// number), optional WA_ALLOWED_TO (comma-separated numbers allowed to receive, recommended for a public link).

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 30;
}

export default async function handler(req, res) {
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || '+14155238886';
  if (req.method === 'GET') return res.status(200).json({ ok: !!(sid && token), sandbox: !process.env.TWILIO_WHATSAPP_FROM });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  if (!sid || !token) return res.status(503).json({ error: 'WhatsApp sending is not set up on the server.' });
  const ip = String(req.headers['x-forwarded-for'] || 'local').split(',')[0];
  if (limited(ip)) return res.status(429).json({ error: 'Too many messages. Try again later.' });
  const body = req.body || {};
  const to = String(body.to || '').replace(/[^\d+]/g, '');
  if (!/^\+\d{10,15}$/.test(to)) return res.status(400).json({ error: 'Phone number must look like +9198XXXXXXXX.' });
  const allowed = (process.env.WA_ALLOWED_TO || '').split(',').map((s) => s.replace(/[^\d+]/g, '')).filter(Boolean);
  if (allowed.length && !allowed.includes(to)) return res.status(403).json({ error: 'This number is not on the allowed list for the demo.' });
  const messages = (Array.isArray(body.messages) ? body.messages : []).map((m) => String(m).slice(0, 1500)).filter(Boolean).slice(0, 5);
  if (!messages.length) return res.status(400).json({ error: 'Nothing to send.' });
  const auth = 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64');
  const sent = [];
  for (const m of messages) {
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { authorization: auth, 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: `whatsapp:${from}`, To: `whatsapp:${to}`, Body: m }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ error: j.message || `Twilio ${r.status}`, sent: sent.length, hint: j.code === 63015 || j.code === 63016 ? 'Send the sandbox join code (and then "hi") from this phone to the Twilio number first.' : undefined });
    sent.push(j.sid);
  }
  return res.status(200).json({ ok: true, sent: sent.length });
}
