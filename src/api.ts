import {
  abort,
  run,
  chat,
  stopProcess,
  serve,
} from "./service/ollama/ollama.js";
import { bufferResponse } from "./utils/responseHandler";
import { getConfigData } from "./service/config/config";

export async function runOllamaModel(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  msg: any,
) {
  try {
    const configData = getConfigData();
    console.log(configData.model);

    // send an empty message to the model to load it into memory
    await run(
      configData.model,
      (json: {
        status: string | string[];
        completed: number;
        total: number;
        done: any;
      }) => {
        // status will be set if the model is downloading
        if (json.status) {
          if (json.status.includes("pulling")) {
            const percent = Math.round((json.completed / json.total) * 100);
            const content = isNaN(percent)
              ? "Downloading AI model..."
              : `Downloading AI model... ${percent}%`;
            event.reply("ollama:run", { success: true, content: content });
            return;
          }
          if (json.status.includes("verifying")) {
            const content = `Verifying AI model...`;
            event.reply("ollama:run", { success: true, content: content });
            return;
          }
        }
        if (json.done) {
          event.reply("ollama:run", { success: true, content: json });
          return;
        }
        event.reply("ollama:run", {
          success: true,
          content: "Initializing...",
        });
      },
    );
  } catch (err) {
    console.log(err);
    event.reply("ollama:run", { success: false, content: err.message });
  }
}

export async function sendChat(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  msg: any,
) {
  const configData = getConfigData();

  let prompt =
    configData.personalityPrefix +
    `Anything between the following \`user\` html blocks is is part of the conversation with the user.
<user>${msg}</user>`;

  try {
    let response = "";

    await chat(configData.model, prompt, (json: any) => {
      // Buffer the string to send back one message
      if (json.message.content) {
        response = bufferResponse(response, json.message.content);
      }
    });

    event.reply("chat:reply", { success: true, content: response });
  } catch (err) {
    console.log(err);
    event.reply("chat:reply", { success: false, content: err.message });
  }
}

export async function stopChat() {
  await abort();
}

export async function serveOllama(event: {
  reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
}) {
  try {
    const serveType = await serve();
    event.reply("ollama:serve", { success: true, content: serveType });
  } catch (err) {
    event.reply("ollama:serve", { success: false, content: err.message });
  }
}

export function stopOllama(event: any) {
  stopProcess();
}

export async function requestConfig(event: {
  reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
}) {
  try {
    const configData = getConfigData();
    event.reply("config:get", { success: true, content: configData });
  } catch (err) {
    console.log(err);
  }
}
