import React, { useState } from "react";

import MainView from "./MainView/MainView";
import InitView from "./InitView/InitView";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  window.electronAPI.onOllamaRun((event, data) => {
    if (!data.success) {
      console.log("TODO - error in onOllamaRun in App.tsx");
      return;
    }
    if (data.content.done) {
      setLoading(false);
      return;
    }
  });

  return (
    <div>{loading ? <InitView statusText="Initializing" /> : <MainView />}</div>
  );
};

export default App;
