export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { yonalish, byudjet, muammo, ism, telefon } = req.body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text =
      `🎯 Yangi ariza — Taklifimiz\n\n` +
      `👤 Ism: ${ism}\n` +
      `📞 Telefon: ${telefon}\n` +
      `🏢 Yo'nalish: ${yonalish}\n` +
      `💰 Byudjet: ${byudjet}\n` +
      `❗ Muammo: ${muammo}`;

    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      console.error('Telegram xatoligi:', errText);
      res.status(502).json({ error: 'Telegram error' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server xatoligi:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
