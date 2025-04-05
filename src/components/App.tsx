import React, { useState } from "react";

import MainView from "./MainView/MainView";
import InitView from "./InitView/InitView";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/MysticalTheme";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Turning on the big brain...");

  window.electronAPI.onOllamaRun((event, data) => {
    if (!data.success) {
      setStatus("Error: " + data.content);
      return;
    }
    if (data.content.done) {
      setLoading(false);
      return;
    }
    setStatus(data.content);
  });

  return (
    <ThemeProvider theme={theme}>
      <div>{loading ? <InitView statusText={status} /> : <MainView />}</div>
    </ThemeProvider>
  );
};

export default App;
