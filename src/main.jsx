import React from "react";
import { createRoot } from "react-dom/client";

function App() {

  const sendTelegram = async () => {

    const token = "8938245731:AAGm2tRTzKlNakxle7eRvsKJb0eqfFgfFcs";
    const chatId = "480082577";

    try {

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Новая заявка с сайта Бетонсервис",
        }),
      });

      alert("Заявка отправлена!");

    } catch (error) {

      alert("Ошибка отправки");

    }
  };

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Бетонсервис</h1>

      <button
        onClick={sendTelegram}
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          background: "orange",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Отправить заявку
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
