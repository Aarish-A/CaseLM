import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "learnlm-1.5-pro-experimental",
});

export async function POST(req) {
  try {
    const { caseData, userMessage, chatHistory } = await req.json();

    // Handle file upload
    const listFilesResponse = await fileManager.listFiles();
    let fileUri = null;

    const existingFile = listFilesResponse.files?.find(
      (file) => file.displayName == caseData.title
    );

    if (existingFile) {
      fileUri = existingFile.uri;
    } else {
      const uploadResponse = await fileManager.uploadFile(
        path.join(process.cwd(), "public", caseData.url),
        {
          mimeType: "application/pdf",
          displayName: caseData.title,
        }
      );
      fileUri = uploadResponse.file.uri;
    }

    // Generate response from LearnLM
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: { mimeType: "application/pdf", fileUri: fileUri },
            },
          ],
        },
        ...chatHistory,
      ],
    });
    const result = await chat.sendMessage([{ text: userMessage }]);

    return new Response(JSON.stringify({ response: result.response.text() }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in Gemini API Route:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}
