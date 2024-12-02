"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import CaseChat from "@/components/chat/CaseChat";
import CaseList from "@/components/CaseList";
import CaseDetail from "@/components/CaseDetail";
import FeedbackModal from "@/components/FeedbackModal";

import { cases } from "../../data/cases";
import {
  getChatHistory,
  saveCaseFeedback,
  getCaseFeedback,
  clearCaseFeedback,
  caseFeedbackExists,
} from "@/utils/localStorage";
import { updateFeedbackSummary } from "@/utils/api";

export default function CaseLM() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    if (!selectedCase) return;
    if (caseFeedbackExists(selectedCase.id)) {
      const storedFeedback = getCaseFeedback(selectedCase.id);
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
      setFeedbackLoading(true);
      const caseData = selectedCase;
      const response = await fetch("/api/gemini/caselmfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const feedbackContent = data.response;
        setFeedback(feedbackContent);
        setFeedbackModalOpen(true);
        updateFeedbackSummary();
      }
    } catch (error) {
      console.error("Failed to process feedback:", error);
    } finally {
      setFeedbackLoading(false);
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
          feedbackLoading={feedbackLoading}
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
