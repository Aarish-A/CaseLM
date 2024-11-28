"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { cases } from "../../data/cases";
import CaseList from "../../components/CaseList";
import CaseDetail from "../../components/CaseDetail";
import CaseChat from "../../components/chat/CaseChat";
import FeedbackModal from "../../components/FeedbackModal";
import {
  getChatHistory,
  saveCaseFeedback,
  getCaseFeedback,
  clearCaseFeedback,
} from "@/utils/localStorage";

export default function CaseLM() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [feedback, setFeedback] = useState(null); // Feedback content
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    if (!selectedCase) return;
    const storedFeedback = getCaseFeedback(selectedCase.id);
    if (storedFeedback !== "") {
      setFeedback(storedFeedback);
    }
  }, [selectedCase]);

  useEffect(() => {
    if (!selectedCase) return;
    saveCaseFeedback(selectedCase.id, feedback);
  }, [feedback, selectedCase]);

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleBack = () => {
    setSelectedCase(null);
  };

  const handleFinish = async () => {
    if (feedback != null) {
      setFeedbackModalOpen(true);
      return;
    }

    const chatHistory = getChatHistory(selectedCase.id);

    try {
      const response = await fetch("/api/gemini/caselmfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedCase,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const feedbackContent = data.response;
        setFeedback(feedbackContent);
        setFeedbackModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to retrieve feedback:", error);
    }
  };

  const handleCloseModal = () => {
    setFeedbackModalOpen(false);
  };

  const handleReset = () => {
    clearCaseFeedback(selectedCase.id);
  };

  if (!selectedCase)
    return (
      <Box sx={{ width: "1fr", padding: 4, maxWidth: "75%" }}>
        <Typography variant="h4" gutterBottom>
          Select a Case
        </Typography>
        <CaseList cases={cases} onCaseSelect={handleCaseSelect} />
      </Box>
    );

  return (
    <Box sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <>
        <CaseDetail caseData={selectedCase} />
        <CaseChat
          caseData={selectedCase}
          onBack={handleBack}
          onReset={handleReset}
          onFinish={handleFinish}
        />
        <FeedbackModal
          open={feedbackModalOpen}
          handleCloseModal={handleCloseModal}
          caseData={selectedCase}
          feedback={feedback}
        />
      </>
    </Box>
  );
}
