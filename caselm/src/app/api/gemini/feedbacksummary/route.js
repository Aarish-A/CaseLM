import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt } from "@/utils/getSystemPrompt";
import { cases } from "@/data/cases";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const systemPrompt = getSystemPrompt("feedbacksummarySystem.txt");
const userPrompt = getSystemPrompt("feedbacksummaryUser.txt");
const model = genAI.getGenerativeModel({
  model: "learnlm-1.5-pro-experimental",
  systemInstruction: systemPrompt,
});

export async function POST(req) {
  try {
    const { caseFeedbacks } = await req.json();
    const feedbacksString = Object.entries(caseFeedbacks)
      .map(
        ([caseId, feedback]) =>
          `Case ${
            cases.find(({ id }) => id == caseId).title
          } Feedback: ${feedback}`
      )
      .join("\n\n");

    const chat = model.startChat({
      history: [],
    });

    const resultStream = await chat.sendMessageStream(
      `${userPrompt}\n\n${feedbacksString}`
    );

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
    console.error("Error in Gemini API Route:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}
