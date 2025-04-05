import React, { useState } from "react";

import MainView from "./MainView/MainView";
import InitView from "./InitView/InitView";

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

  return <div>{loading ? <InitView statusText={status} /> : <MainView />}</div>;
};

export default App;
