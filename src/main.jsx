 import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const sendTelegram = async () => {
    const token = "8938245731:AAGm2tRTzKlNakxle7eRvsKJb0eqfFgfFcs";
    const chatId = "480082577";

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Новая заявка с сайта Бетонсервис",
      }),
    });

    alert("Заявка отправлена в Telegram");
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1>Бетонсервис</h1>
      <p>Бетон и раствор с доставкой в Стерлитамаке</p>

      <a href="tel:+73473214585">
        <button style={{ padding: 20, margin: 10, fontSize: 18 }}>
          Позвонить
        </button>
      </a>

      <button onClick={sendTelegram} style={{ padding: 20, margin: 10, fontSize: 18 }}>
        Отправить заявку в Telegram
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
