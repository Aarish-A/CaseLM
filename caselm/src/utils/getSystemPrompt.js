import fs from "fs";
import path from "path";
import { getName } from "./localStorage";

// Base directory
const systemPromptsDir = path.join(process.cwd(), "src/prompts");

export const getSystemPrompt = (filename) => {
  const name = getName();

  try {
    const filePath = path.join(systemPromptsDir, filename);
    const message = fs.readFileSync(filePath, "utf8");
    return `${message}\n\nYour student's name is: ${name}`;
  } catch (error) {
    console.error(`Error reading system message file: ${filename}`, error);
    return "Default system message could not be loaded.";
  }
};
