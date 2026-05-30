export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const { name, phone, grade, address } = req.body;

  const text = `
🟡 Новая заявка с сайта Бетонсервис

Имя: ${name || '-'}
Телефон: ${phone || '-'}
Марка бетона: ${grade || '-'}
Адрес/объём: ${address || '-'}
`;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text
      })
    }
  );

  const data = await response.json();

  return res.status(200).json(data);
}
