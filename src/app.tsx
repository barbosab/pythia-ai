import { createRoot } from "react-dom/client";

import App from "./components/App";

const root = createRoot(document.body);
root.render(<App />);

// 1. Start the Ollama server
window.electronAPI.serveOllama();

// 2. Run the model
window.electronAPI.onOllamaServe((event, data) => {
  if (!data.success) {
    // TODO - need an error state
    console.log("Error 1");
    return;
  }

  window.electronAPI.runOllama();
});
