import React from "react";
import TextSender from "../TextSender/TextSender";

const handleSend = (text: string) => {
  console.log("Text received in MainView:", text);

  window.electronAPI.sendChat("some data");
};

const MainView: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <TextSender onSend={handleSend} />
    </div>
  );
};

export default MainView;
