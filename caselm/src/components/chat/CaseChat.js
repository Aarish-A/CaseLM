import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatHeader from "./ChatHeader";
import ChatMessagesWindow from "./ChatMessagesWindow";
import ChatInput from "./ChatInput";

export default function CaseChat({ caseData, onBack, onFinish }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessageToHistory = (role, messageText) => {
    setChatHistory((prev) => [
      ...prev,
      { role, parts: [{ text: messageText }] },
    ]);
  };

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    addMessageToHistory("user", userMessage);
    setIsLoading(true);
    console.log(caseData);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData: {
            url: caseData.url,
            title: caseData.title,
          },
          userMessage,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (data.response) {
        addMessageToHistory("model", data.response);
      } else {
        addMessageToHistory("model", "Failed to retrieve response.");
      }
    } catch (error) {
      console.error("Error in client-side message handling:", error);
      addMessageToHistory("model", "Failed to retrieve response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #ccc",
        padding: 2,
      }}
    >
      <ChatHeader onBack={onBack} onFinish={onFinish} />
      <ChatMessagesWindow chatHistory={chatHistory} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Box>
  );
}
