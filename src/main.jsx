import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const sendTelegram = () => {
    const token = "8938245731:AAGm2tRTzKlNakxle7eRvsKJb0eqfFgfFcs";
    const chatId = "480082577";

    const text = `
Новая заявка с сайта Бетонсервис
`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })
      .then(() => {
        alert("Заявка отправлена!");
      })
      .catch(() => {
        alert("Ошибка отправки");
      });
  };

  return (
    <div
      style={{
        background: "#111",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <h1>Бетонсервис</h1>

      <button
        onClick={sendTelegram}
        style={{
          padding: "20px 40px",
          fontSize: "22px",
          borderRadius: "12px",
          border: "none",
          background: "#f5b942",
          cursor: "pointer",
        }}
      >
        Отправить заявку в Telegram
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
