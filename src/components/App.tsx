import React, { useState } from "react";

import MainView from "./MainView/MainView";
import InitView from "./InitView/InitView";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  window.electronAPI.onOllamaRun((event, data) => {
    if (!data.success) {
      // initalSpinner.style.display = "none";
      // statusMsg.textContent = "Error: " + data.content;
      console.log("Error 2 in the app");
      return;
    }
    if (data.content.done) {
      console.log("DONE in the app");
      setLoading(false);
      return;
    }
    //   statusMsg.textContent = data.content;
  });

  return <div>{loading ? <InitView /> : <MainView />}</div>;
};

export default App;
