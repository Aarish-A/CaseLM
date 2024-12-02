import fs from "fs";
import path from "path";

// Base directory
const systemPromptsDir = path.join(process.cwd(), "src/prompts");

export const getSystemPrompt = (filename) => {
  try {
    const filePath = path.join(systemPromptsDir, filename);
    const message = fs.readFileSync(filePath, "utf8");
    return message;
  } catch (error) {
    console.error(`Error reading system message file: ${filename}`, error);
    return "Default system message could not be loaded.";
  }
};
