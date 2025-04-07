import React, { useEffect, useState } from "react";
import TextSender from "../TextSender/TextSender";
import {
  bufferResponse,
  addAnswer,
  getAnswers,
  addQuestion,
  getQuestions,
} from "../../utils/responseHandler";
import TextHistory from "../TextHistory/TextHistory";
import NavBar from "../NavBar/NavBar";
import SettingsView from "../SettingsView/SettingsView";

const MainView: React.FC = () => {
  const [questions, setQuestions] = useState(getQuestions());
  const [answers, setAnswers] = useState(getAnswers());
  const [sending, setSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSend = (text: string) => {
    setSending(true);
    addQuestion(text);
    setQuestions([...getQuestions()]);
    window.electronAPI.sendChat(text);
  };

  const onSettingsClick = (showBool: boolean) => {
    setShowSettings(showBool);
  };

  let response = "";

  useEffect(() => {
    window.electronAPI.onChatReply((event, data) => {
      if (!data.success) {
        console.log("Error: " + data.content);
        return;
      }

      if (data.content) {
        response = bufferResponse(response, data.content);
      }

      if (data.content) {
        addAnswer(response);
        setAnswers([...getAnswers()]);
        setSending(false);
        response = "";
      }
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(106, 13, 173, 0.3)", // RGB values of 6A0DAD with 0.2 opacity
        minHeight: "100vh",
      }}
    >
      {showSettings ? (
        <SettingsView onSettingsClick={onSettingsClick} />
      ) : (
        <React.Fragment>
          <NavBar onSettingsClick={onSettingsClick} />
          <TextHistory questions={questions} answers={answers} />
          <TextSender isSending={sending} onSend={handleSend} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MainView;
