// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { ConfigFile } from "./service/config/config";

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
  requestConfig: () => {
    ipcRenderer.send("config:request");
  },
  onConfigReply: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
  ) =>
    ipcRenderer.on("config:get", (event: any, data: any) => {
      callback(event, data);
    }),
  setConfig: (configData: ConfigFile) => {
    ipcRenderer.send("config:set", configData);
  },
  addToVectra: (csvContent: string) => {
    ipcRenderer.send("vectra:addcsv", csvContent);
  },
});
