import {
  abort,
  run,
  chat,
  stopProcess,
  serve,
} from "./service/ollama/ollama.js";

let model = "mistral";

export async function setModel(event: any, msg: string) {
  model = msg;
}

export async function getModel(event: {
  reply: (arg0: string, arg1: { success: boolean; content: string }) => void;
}) {
  event.reply("model:get", { success: true, content: model });
}

export async function runOllamaModel(
  event: {
    reply: (arg0: string, arg1: { success: boolean; content: any }) => void;
  },
  msg: any,
) {
  try {
    // send an empty message to the model to load it into memory
    await run(
      model,
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
  let prompt = msg;
  console.log("I AM IN HERE!!!");

  try {
    await chat(model, prompt, (json: any) => {
      console.log("inside the await loop");
      // Reply with the content every time we receive data
      event.reply("chat:reply", { success: true, content: json });
    });
    console.log("After await chat");
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
