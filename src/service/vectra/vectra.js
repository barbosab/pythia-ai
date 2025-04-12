import { app } from "electron";
import path from "path";
import { LocalIndex } from "vectra";
import { generateEmbedding } from "../ollama/ollama";
import { add } from "winston";

//TODO: move this to config file
const embeddingModel = "mxbai-embed-large";

let index = null;

export function getConfigFolderPath() {
  return path.join(app.getPath("appData"), "pythia-ai", "CustomData");
}

export async function initIndex() {
  const configFolderPath = getConfigFolderPath();
  index = new LocalIndex(path.join(configFolderPath, "index"));

  if (!(await index.isIndexCreated())) {
    await index.createIndex();
  }
}

async function addItem(text) {
  await index.insertItem({
    vector: await generateEmbedding(text),
    metadata: { text },
  });
}

export async function queryVectra(text, embeddings) {
  let data = "";
  const vector = await generateEmbedding(text);
  const results = await index.queryItems(vector, 5);

  if (results.length > 0) {
    for (const result of results) {
      console.log(`[${result.score}] ${result.item.metadata.text}`);
      data += result.item.metadata.text;
      data += " ";
    }
  } else {
    console.log(`No results found.`);
  }

  return data;
}
