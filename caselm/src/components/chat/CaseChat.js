import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatMessagesWindow from "./ChatMessagesWindow";
import ChatInput from "./ChatInput";

import { exampleConversationMediDisplays } from "@/data/exampleConversationMediDisplays";
import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  caseFeedbackExists,
} from "@/utils/localStorage";

export default function CaseChat({
  caseData,
  onBack,
  onReset: resetFeedback,
  onFinish,
  feedbackLoading,
}) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const storedHistory = getChatHistory(caseData.id);
    if (storedHistory.length > 0) {
      setChatHistory(storedHistory);
    } else if (caseData.id === 1) {
      setChatHistory(exampleConversationMediDisplays);
    }
  }, [caseData]);

  useEffect(() => {
    saveChatHistory(caseData.id, chatHistory);
  }, [chatHistory, caseData]);

  const addMessageToHistory = (role, messageText) => {
    setChatHistory((prev) => [
      ...prev,
      { role, parts: [{ text: messageText }] },
    ]);
  };

  // Helper to process stream chunks
  async function* streamChunks(reader, decoder) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  }

  // Helper to update message text
  const updateMessageText = (index, newText) => {
    setChatHistory((prev) => {
      const updated = [...prev];
      updated[index].parts[0].text = newText;
      return updated;
    });
  };

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    addMessageToHistory("user", userMessage);
    addMessageToHistory("model", ""); // Placeholder message to update as message gets streamed in
    const newModelMsgIndex = chatHistory.length + 1;

    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/caselm", {
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

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = "";

      // Stream and update the placeholder in real-time
      for await (const chunk of streamChunks(reader, decoder)) {
        accumulatedMessage += chunk;
        updateMessageText(newModelMsgIndex, accumulatedMessage);
      }
    } catch (error) {
      console.error("Streaming error:", error);
      updateMessageText(
        newModelMsgIndex,
        "Error occurred during streaming. Try Again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    clearChatHistory(caseData.caseId);
    setChatHistory([]);
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
      }}
    >
      <ChatHeader
        caseData={caseData}
        onBack={onBack}
        onReset={() => {
          resetFeedback();
          resetChat();
        }}
        onFinish={onFinish}
        feedbackLoading={feedbackLoading}
        completed={caseFeedbackExists(caseData.id) ? true : false}
        disabled={chatHistory.length == 0 ? true : false}
      />
      <ChatMessagesWindow
        chatHistory={chatHistory}
        onSendDefaultMessage={handleSendMessage}
        showExampleSnippitsLink={caseData.hasExample}
      />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Box>
  );
}
