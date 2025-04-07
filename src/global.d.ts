export {}; // Ensures this file is treated as a module

declare global {
  interface Window {
    electronAPI: {
      sendChat: (text: string) => void;
      onChatReply: (callback: (event: any, data: any) => void) => void;
      stopChat: () => void;
      serveOllama: () => void;
      onOllamaServe: (callback: (event: any, data: any) => void) => void;
      runOllama: () => void;
      onOllamaRun: (callback: (event: any, data: any) => void) => void;
    };
  }
}
