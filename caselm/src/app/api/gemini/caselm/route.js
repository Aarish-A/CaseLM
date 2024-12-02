import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { getSystemPrompt } from "@/utils/getSystemPrompt";

const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY
);

const systemPrompt = getSystemPrompt("caselmSystem.txt");
const model = genAI.getGenerativeModel({
  model: "learnlm-1.5-pro-experimental",
  systemInstruction: systemPrompt,
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

    const resultStream = await chat.sendMessageStream(userMessage);

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of resultStream.stream) {
            controller.enqueue(chunk.text());
          }
          controller.close();
        },
        cancel() {
          console.log("Stream canceled");
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  } catch (error) {
    console.error("Error in Gemini API streaming:", error);
    return new Response("Error occurred", { status: 500 });
  }
}
