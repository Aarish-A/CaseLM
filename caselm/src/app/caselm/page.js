"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CaseChat from "@/components/chat/CaseChat";
import CaseList from "@/components/CaseList";
import CaseDetail from "@/components/CaseDetail";
import FeedbackModal from "@/components/FeedbackModal";

import { cases } from "../../data/cases";
import { streamChunks } from "@/utils/api";
import {
  getChatHistory,
  saveCaseFeedback,
  getCaseFeedback,
  clearCaseFeedback,
  caseFeedbackExists,
} from "@/utils/localStorage";

export default function CaseLM() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // For mobile view toggle

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
  }, [feedback]);

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleBack = () => {
    setSelectedCase(null);
    setFeedback(null);
    setCurrentTab(0); // Reset mobile view to first tab
  };

  const handleFinish = async () => {
    if (feedback != null) {
      setFeedbackModalOpen(true);
      return;
    }

    const chatHistory = getChatHistory(selectedCase.id);

    try {
      setFeedbackLoading(true);
      setFeedbackModalOpen(true);
      const caseData = selectedCase;
      const response = await fetch("/api/gemini/caselmfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData,
          chatHistory,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = "";

      // Stream and update feedback modal
      for await (const chunk of streamChunks(reader, decoder)) {
        accumulatedMessage += chunk;
        setFeedback(accumulatedMessage);
      }
    } catch (error) {
      console.error("Failed to process feedback streaming:", error);
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
      <Box
        sx={{ backgroundColor: "#f9fafc", minHeight: "100vh", py: 5, px: 4 }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 4,
            p: 4,
            mb: 3,
            textAlign: "center",
            border: 1,
            borderColor: "#e9eef6",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Select a Case
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose any of the Ivey Business School cases below to tackle
            together with CaseLM and get feedback. Each case tackles a unique,
            open-ended problem that requires you to tie in multiple concepts
            together.
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "60rem", margin: "0 auto" }}>
          <CaseList cases={cases} onCaseSelect={handleCaseSelect} />
        </Box>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {isMobile && (
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{
            bgcolor: "white",
            flexShrink: 0,
            borderBottom: "1px solid #ddd",
            height: "48px", // Fixed height for tabs
          }}
          centered
        >
          <Tab label="Chat" />
          <Tab label="Case Details" />
        </Tabs>
      )}

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        {isMobile ? (
          currentTab === 0 ? (
            <CaseChat
              caseData={selectedCase}
              onBack={handleBack}
              onReset={handleReset}
              feedbackLoading={feedbackLoading}
              onFinish={handleFinish}
            />
          ) : (
            <CaseDetail caseData={selectedCase} />
          )
        ) : (
          <>
            <CaseChat
              caseData={selectedCase}
              onBack={handleBack}
              onReset={handleReset}
              feedbackLoading={feedbackLoading}
              onFinish={handleFinish}
            />
            <CaseDetail caseData={selectedCase} />
          </>
        )}
      </Box>

      <FeedbackModal
        open={feedbackModalOpen}
        handleCloseModal={handleCloseModal}
        caseData={selectedCase}
        feedback={feedback}
      />
    </Box>
  );
}
