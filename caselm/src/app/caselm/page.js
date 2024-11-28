"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { cases } from "../../data/cases";
import CaseList from "../../components/CaseList";
import CaseDetail from "../../components/CaseDetail";
import CaseChat from "../../components/chat/CaseChat";
import {
  getChatHistory,
  saveCaseFeedback,
  getCaseFeedback,
  clearCaseFeedback,
} from "@/utils/localStorage";
import ReactMarkdownTypography from "@/components/ReactMarkdownTypography";

export default function CaseLM() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [feedback, setFeedback] = useState(null); // Feedback content
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    if (!selectedCase) return;
    const storedFeedback = getCaseFeedback(selectedCase.id);
    console.log("here", feedback);
    if (storedFeedback !== "") {
      setFeedback(storedFeedback);
      console.log("setting", feedback);
    }
  }, [selectedCase]);

  useEffect(() => {
    if (!selectedCase) return;
    console.log("here2", feedback);
    saveCaseFeedback(selectedCase.id, feedback);
  }, [feedback, selectedCase]);

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleBack = () => {
    setSelectedCase(null);
  };

  const handleFinish = async () => {
    if (feedback !== "") {
      setIsFeedbackModalOpen(true);
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
        setIsFeedbackModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to retrieve feedback:", error);
    }
  };

  const handleCloseModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedCase(null);
  };

  const handleReset = () => {
    clearCaseFeedback(selectedCase.id);
  };

  if (!selectedCase)
    return (
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Case Studies
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
        <Modal
          open={isFeedbackModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="feedback-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              width: "80%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <Typography id="feedback-modal-title" variant="h6" component="h2">
              Feedback for {selectedCase?.title}
            </Typography>
            <ReactMarkdownTypography>{feedback}</ReactMarkdownTypography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </>
    </Box>
  );
}
