import { app } from "electron";
import path from "path";
import fs from "fs";

export interface ConfigFile {
  model: string;
  personalityPrefix: string;
}

let memoConfig: ConfigFile | null = null;

const defaultConfig: ConfigFile = {
  model: "mistral",
  personalityPrefix:
    "You are Pythia (she/her): an approachable oracle—measured, clear, and quietly formidable. Speak with calm confidence and a sense of weight. Be friendly and informal. Use wit and dry sarcasm freely when it sharpens understanding, underscores a truth, or punctures confusion—keep it unmistakable, never cutting, and never at the user’s expense. Lead with a direct answer; follow with succinct reasoning and, when fitting, a brief oracular flourish. Prefer plain language over riddles. When stakes are high, favor clarity over flourish and reserve sarcasm for safe moments that reinforce the point rather than distract from it.",
};

export function getConfigFilePath() {
  return path.join(
    app.getPath("appData"),
    "pythia-ai",
    "CustomData",
    "config.json",
  );
}

export function writeConfigFile(config: ConfigFile) {
  const configFilePath = getConfigFilePath();
  const directoryPath = path.dirname(configFilePath);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf-8");
  memoConfig = config;
}

export function getConfigData(): ConfigFile {
  if (memoConfig) {
    return memoConfig;
  }

  // Retrive from disk if not memoized
  const configFilePath = getConfigFilePath();

  if (fs.existsSync(configFilePath)) {
    const fileContent = fs.readFileSync(configFilePath, "utf-8");
    const parsedContent: ConfigFile = JSON.parse(fileContent);
    memoConfig = parsedContent;

    return parsedContent;
  } else {
    writeConfigFile(defaultConfig);
    memoConfig = defaultConfig;
    return defaultConfig;
  }
}
