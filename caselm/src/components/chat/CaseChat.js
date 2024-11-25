import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHeader from "./ChatHeader";
import ChatMessagesWindow from "./ChatMessagesWindow";
import ChatInput from "./ChatInput";

export default function CaseChat({ onBack, onFinish }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    );
    const model = genAI.getGenerativeModel({
      model: "learnlm-1.5-pro-experimental",
    });
    setModel(model);
  }, []);

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

    if (!model) {
      console.error("Model is not initialized.");
      setIsLoading(false);
      return;
    }

    try {
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(userMessage);
      const responseMessage = result.response.text();
      addMessageToHistory("model", responseMessage);
    } catch (error) {
      console.error("Error fetching LearnLM response:", error);
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
