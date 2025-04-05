import React from "react";

interface TextHistoryProps {
  questions: string[];
  answers: string[];
}

const TextHistory: React.FC<TextHistoryProps> = ({ questions, answers }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <div>{question}</div>
          <div>{answers[index]}</div>
        </div>
      ))}
    </div>
  );
};

export default TextHistory;
