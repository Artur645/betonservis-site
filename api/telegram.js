export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    // 1. Если пришла заявка с формы сайта
    if (req.body.name || req.body.phone || req.body.grade || req.body.address) {
      const { name, phone, grade, address } = req.body;

      const text = `
🟡 Новая заявка с сайта Бетонсервис

Имя: ${name || '-'}
Телефон: ${phone || '-'}
Марка бетона: ${grade || '-'}
Адрес/объём: ${address || '-'}
`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text
        })
      });

      return res.status(200).json({ ok: true });
    }

    // 2. Если человек написал прямо в Telegram-бот
    const message = req.body.message;

    if (message) {
      const userText = message.text || '';
      const from = message.from || {};

      if (userText === '/start') {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: message.chat.id,
            text:
              'Здравствуйте! Вы попали в Бетонсервис.\n\nНапишите, какой бетон или раствор нужен, объём и адрес доставки. Менеджер свяжется с вами.'
          })
        });
      } else {
        const forwardText = `
💬 Сообщение из Telegram-бота

Имя: ${from.first_name || '-'}
Username: ${from.username ? '@' + from.username : '-'}
ID: ${from.id || '-'}

Сообщение:
${userText}
`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: forwardText
          })
        });

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: message.chat.id,
            text: 'Спасибо! Ваша заявка получена. Менеджер скоро свяжется с вами.'
          })
        });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
