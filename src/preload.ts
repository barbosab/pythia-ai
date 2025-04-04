// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

// Here, we use the `contextBridge` API to expose a custom API to the renderer process.
// This API allows the renderer process to invoke events in the main process which interact with the operating system.
contextBridge.exposeInMainWorld("electronAPI", {
  sendChat: (text: any) => ipcRenderer.send("chat:send", text),
  onChatReply: (callback: (arg0: any, arg1: any) => void) => {
    ipcRenderer.on("chat:reply", (event: any, data: any) => {
      callback(event, data);
    });
  },
  stopChat: () => ipcRenderer.send("chat:stop"),
  serveOllama: () => ipcRenderer.send("ollama:serve"),
  onOllamaServe: (callback: (arg0: any, arg1: any) => void) => {
    ipcRenderer.on("ollama:serve", (event: any, data: any) => {
      callback(event, data);
    });
  },
  runOllama: () => ipcRenderer.send("ollama:run"),
  onOllamaRun: (callback: (arg0: any, arg1: any) => void) => {
    ipcRenderer.on("ollama:run", (event: any, data: any) => {
      callback(event, data);
    });
  },
  getModel: () => ipcRenderer.send("model:get"),
  onModelGet: (callback: (arg0: any, arg1: any) => void) => {
    ipcRenderer.on("model:get", (event: any, data: any) => {
      callback(event, data);
    });
  },
  setModel: (model: any) => ipcRenderer.send("model:set", model),
});
