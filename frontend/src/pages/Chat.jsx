import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api, { SOCKET_URL } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Chat() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    api.get(`/api/messages/${userId}`).then(res => setMessages(res.data)).catch(() => {});

    const socket = io(SOCKET_URL);
    socketRef.current = socket;
    socket.emit("join", user.id);

    socket.on("receive_message", (msg) => {
      if (msg.sender === userId) setMessages(prev => [...prev, msg]);
    });
    socket.on("message_sent", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [userId, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socketRef.current.emit("send_message", { senderId: user.id, receiverId: userId, text });
    setText("");
  };

  return (
    <div className="chat-page">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={m._id || i} className={`chat-bubble ${m.sender === user.id ? "chat-bubble-mine" : ""}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="chat-input-row" onSubmit={sendMessage}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message…" />
        <button className="btn-primary-sm" type="submit">Send</button>
      </form>
    </div>
  );
}
