export const uploadPdf = async (pdfUrl, pdfTitle) => {
  try {
    console.log("pdfpath/title", pdfUrl, pdfTitle);
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

export const sendMessageToChat = async (message, fileUri, history) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, fileUri, history }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send chat message");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error in sendMessageToChat:", error);
    throw error;
  }
};
