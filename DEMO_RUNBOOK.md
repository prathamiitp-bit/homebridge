# HomeBridge live demo runbook

## The day before
1. Open `https://<project>.vercel.app/papers.html` and print all 8 pages (A4, colour if possible). They are dated for that day; to print for the meeting day, add `?today=YYYY-MM-DD`.
   The PDF in `sample-papers/` is dated 18 Nov 2026: if you print that one, open the app with `?today=2026-11-18`.
2. WhatsApp (Twilio sandbox): from your phone, send the sandbox join code (shown in Twilio → Messaging → Try it out → WhatsApp) to +1 415 523 8886. On the meeting morning send "hi" again so the 24-hour window is open.
3. Dry run once on your phone, on the same Wi-Fi/hotspot you'll use in the meeting.

## In the meeting (about 4 minutes)
1. Show the folder of printed papers: "this is what a family takes home".
2. On your phone, open the link, Start → choose or auto-detect the condition → **Take a photo of a paper**, one per page (or snap all 8 with the camera app and use **Choose photos**).
3. Tap **Read my papers**. Live AI reads them (about 30–60 seconds): narrate the steps on screen.
4. Checklist: point at the green "matched the answer key" banner and the missing speech & swallow therapy item.
5. Plan → Today (pill colour and shape), Medicines (Pantoprazole stopped by the newest paper, with the source quote), Visits, Bills (₹2,79,740).
6. Ask: "When is the PET scan?" (cited answer) and "Can I stop the mouthwash?" (refused → doctor question).
7. Buy → **Use the sample case's medicine box** → cheapest cart ₹2,425.
8. More → WhatsApp → enter your number → **Send the medicine reminder in 1 minute** → keep talking → phone buzzes.
9. More → How HomeBridge decides: knowledge bases and weights.

## Showing your phone on the big screen
Join the call from the phone too and share its screen, or use the laptop: Android `scrcpy`, iPhone QuickTime → New Movie Recording → choose the iPhone.

## If something fails
- No internet or AI error: Start over → **Use the sample folder (8 papers)**. Same plan from the saved answer key.
- WhatsApp error 63015/63016: the phone has not joined the sandbox or the 24-hour window closed. Send "hi" and retry, or tap **Open in WhatsApp** under any message.
