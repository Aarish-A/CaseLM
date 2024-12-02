import { getAllCaseFeedbacks, saveFeedbackSummary } from "./localStorage";

export const updateFeedbackSummary = async () => {
  const caseFeedbacks = getAllCaseFeedbacks();

  try {
    const response = await fetch("/api/gemini/feedbacksummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caseFeedbacks,
      }),
    });

    const data = await response.json();

    if (data.response) {
      saveFeedbackSummary(data.response);
    }
  } catch (error) {
    console.error("Failed to process feedback:", error);
  }
};

export const geminiChatHistoryToString = (chatHistory) => {
  if (!Array.isArray(chatHistory)) {
    throw new Error("chatHistory must be an array");
  }

  return chatHistory
    .map((entry) => {
      const role = entry.role === "user" ? "User" : "Model";
      const message = entry.parts.map((part) => part.text).join("\n");
      return `${role}: ${message}`;
    })
    .join("\n\n");
};
