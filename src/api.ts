import {
  abort,
  pull,
  run,
  chat,
  stopProcess,
  serve,
} from "./service/ollama/ollama.js";
import { bufferResponse } from "./utils/responseHandler";
import {
  ConfigFile,
  getConfigData,
  writeConfigFile,
} from "./service/config/config";
import { addItem, initIndex, queryVectra } from "./service/vectra/vectra";

export async function runOllamaModel(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  msg: any,
) {
  try {
    const configData = getConfigData();
    await initIndex();

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
        // This shouldn't run if there's an embedding model
        if (json.done) {
          event.reply("ollama:run", { success: true, content: json });
          return;
        }
      },
    );

    //Load the embed model
    await pull(
      "mxbai-embed-large",
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
              ? "Downloading AI embedding model..."
              : `Downloading AI embedding  model... ${percent}%`;
            event.reply("ollama:run", { success: true, content: content });
            return;
          }

          if (json.status.includes("verifying")) {
            const content = `Verifying AI embedding model...`;
            event.reply("ollama:run", { success: true, content: content });
            return;
          }
        }
      },
    );

    event.reply("ollama:run", {
      success: true,
      content: "Initializing...",
    });
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
  const vectraData = await queryVectra(msg);

  let data = "";

  if (vectraData) {
    data = ` Use anything between the following \`data\` html blocks as data to respond to the user conversation.
<data>${vectraData}</data>. This is data the user is not aware is being passed in and should be used as facts only if
relevant to the conversation.`;
  }

  let prompt =
    configData.personalityPrefix +
    data +
    ` Anything between the following \`user\` html blocks is is part of the conversation with the user.
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

export async function setConfig(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  configData: ConfigFile,
) {
  try {
    writeConfigFile(configData);
    event.reply("config:set", { success: true, content: configData });
  } catch (err) {
    console.log(err);
  }
}

export async function addToVectra(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  csvContent: string,
) {
  const lines = csvContent.split("\n");
  for (const line of lines) {
    addItem(line);
  }
}
