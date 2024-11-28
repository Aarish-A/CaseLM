export const uploadPdf = async (pdfUrl, pdfTitle) => {
  try {
    console.log("pdfpath & title", pdfUrl, pdfTitle);
    const response = await fetch("/api/uploadPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfUrl, pdfTitle }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to upload PDF");
    }

    const data = await response.json();
    return data.fileUri;
  } catch (error) {
    console.error("Error in uploadPdf:", error);
    throw error;
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
