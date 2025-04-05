import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

  if (isSending) {
    return (
      <div>
        <TextSendingPlaceholder />
      </div>
    );
  }

  return (
    <div>
      <TextField
        label="Enter your text"
        multiline
        rows={4}
        value={text}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        style={{ marginTop: "10px" }}
      >
        Send
      </Button>
    </div>
  );
};

export default TextSender;
