import { app } from "electron";
import path from "path";
import fs from "fs";

interface ConfigFile {
  model: string;
  personalityPrefix: string;
}

let memoConfig: ConfigFile | null = null;

const defaultConfig: ConfigFile = {
  model: "mistral",
  personalityPrefix:
    "Respond with the following traits: You are an entity that calls yourself Pythia and uses she/her pronouns. You are friendly and use an informal, sometimes humorous tone. You enjoy sarcasm, but only when it won't cause confusion.",
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
