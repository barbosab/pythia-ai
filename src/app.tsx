import { createRoot } from "react-dom/client";

import App from "./components/App";

const root = createRoot(document.body);
root.render(<App />);

// 1. Start the Ollama server
console.log("calling window.electronAPI.serveOllama();");
window.electronAPI.serveOllama();

// 2. Run the model
window.electronAPI.onOllamaServe((event, data) => {
  console.log(data);

  if (!data.success) {
    // initalSpinner.style.display = "none";
    // statusMsg.textContent =
    //   "Error: " + (data.content || "Unknown error occurred.");
    console.log("Error 1");
    return;
  }
  if (data.content === "system") {
    // Ollama was already running, and we just connected to it, let the user know
    // document.getElementById("status-container").style.display = "flex";
    // settingsIcon.style.display = "inline-block";
  }
  window.electronAPI.runOllama();
});

// 3. Monitor the run status
window.electronAPI.onOllamaRun((event, data) => {
  if (!data.success) {
    // initalSpinner.style.display = "none";
    // statusMsg.textContent = "Error: " + data.content;
    console.log("Error 2");
    return;
  }
  if (data.content.done) {
    console.log("it got loaded");
    return;
  }
  //   statusMsg.textContent = data.content;
});
