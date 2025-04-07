import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import TextSendingPlaceholder from "../TextSendingPlaceholder/TextSendingPlaceholder";

interface TextSenderProps {
  onSend: (text: string) => void;
  isSending: boolean;
}

const TextSender: React.FC<TextSenderProps> = ({ onSend, isSending }) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (onSend) {
      onSend(text);
    }
    setText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (isSending) {
    return (
      <div>
        <TextSendingPlaceholder />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        paddingBottom: "32px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <TextField
        label="Enter your text and hit enter to send"
        multiline
        rows={4}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: "16px", // Add rounded corners
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Ensure the input itself has rounded corners
          },
        }}
      />
    </div>
  );
};

export default TextSender;
