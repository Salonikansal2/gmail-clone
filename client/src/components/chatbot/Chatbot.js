import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user message
    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);
    setPrompt("");

    try {
      const res = await axios.post("http://localhost:8000/getReview", {
        prompt,
      });
      const reply = res.data.reply;
      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Something went wrong 😢" },
      ]);
    }
  };

  return (
    <div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "20px",
            width: "80px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "40vw",
            height: "70vh",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✖️
          </button>

          <div style={{ overflowY: "auto", flex: 1, marginBottom: "10px" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  background: msg.role === "user" ? "#d1e7dd" : "#f8d7da",
                  padding: "8px",
                  borderRadius: "6px",
                  margin: "5px 0",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "90%",
                }}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something..."
              style={{ flex: 1, padding: "8px" }}
            />
            <button type="submit" style={{ padding: "8px" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
