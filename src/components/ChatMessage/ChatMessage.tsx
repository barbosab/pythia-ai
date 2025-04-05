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
          backgroundColor: isUser ? "#2C3E50" : "#228B22",
          color: isUser ? "#FFFFFF" : "#FFFFFF",
          textAlign: isUser ? "right" : "left",
        }}
      >
        {message?.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};

export default ChatMessage;
