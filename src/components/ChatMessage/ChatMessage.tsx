import { Card } from "@mui/material";
import React from "react";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        margin: "10px 0",
      }}
    >
      <Card
        style={{
          maxWidth: "70%",
          padding: "10px 15px",
          borderRadius: "15px",
          backgroundColor: isUser ? "#0078D4" : "#E1E1E1",
          color: isUser ? "#FFFFFF" : "#000000",
          textAlign: isUser ? "right" : "left",
        }}
      >
        {message}
      </Card>
    </div>
  );
};

export default ChatMessage;
