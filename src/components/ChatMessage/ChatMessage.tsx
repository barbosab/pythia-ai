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
          backgroundColor: isUser ? "#2C3E50" : "#D3D3D3",
          color: isUser ? "#FFFFFF" : "#000000",
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
