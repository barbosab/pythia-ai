import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface TextSenderProps {
  onSend: (text: string) => void;
}

const TextSender: React.FC<TextSenderProps> = ({ onSend }) => {
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
