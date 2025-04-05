import React from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

interface TextHistoryProps {
  questions: string[];
  answers: string[];
}

const TextHistory: React.FC<TextHistoryProps> = ({ questions, answers }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <ChatMessage message={question} sender={"user"} />
          <ChatMessage message={answers[index]} sender={"bot"} />
        </div>
      ))}
    </div>
  );
};

export default TextHistory;
