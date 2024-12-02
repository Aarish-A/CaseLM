"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import CaseList from "@/components/CaseList";
import FeedbackModal from "@/components/FeedbackModal";
import ReactMarkdownTypography from "@/components/ReactMarkdownTypography";

import { cases } from "@/data/cases";
import {
  getCaseFeedback,
  caseFeedbackExists,
  getFeedbackSummary,
  saveFeedbackSummary,
  getAllCaseFeedbacks,
} from "../utils/localStorage";

export default function Profile() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseFeedback, setSelectedCaseFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackSummary, setFeedbackSummary] = useState("");
  const [feedbackSummaryUpdating, setFeedbackSummaryUpdating] = useState(false);

  const userName = "Aarish"; // Hardcoded for now

  useEffect(() => {
    setFeedbackSummary(getFeedbackSummary() ? getFeedbackSummary() : "DNE");
  }, []);

  const handleCaseSelect = (selectedCase) => {
    if (caseFeedbackExists(selectedCase.id)) {
      const feedback = getCaseFeedback(selectedCase.id);
      setSelectedCaseFeedback(feedback);
      setFeedbackModalOpen(true);
      setSelectedCase(selectedCase);
    }
  };

  const handleCloseModal = () => {
    setFeedbackModalOpen(false);
    setSelectedCase(null);
    setSelectedCaseFeedback("");
  };

  const handleFeedbackSummaryUpdate = async () => {
    setFeedbackSummaryUpdating(true);
    setFeedbackSummary("");
    const caseFeedbacks = getAllCaseFeedbacks();

    try {
      const response = await fetch("/api/gemini/feedbacksummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseFeedbacks,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = "";

      // Stream and update the placeholder in real-time
      for await (const chunk of streamChunks(reader, decoder)) {
        accumulatedMessage += chunk;
        setFeedbackSummary(accumulatedMessage);
      }
      saveFeedbackSummary(accumulatedMessage);
    } catch (error) {
      console.error("Feedback summary streaming error:", error);
    } finally {
      setFeedbackSummaryUpdating(false);
    }
  };

  // Helper to process stream chunks
  async function* streamChunks(reader, decoder) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  }

  return (
    <Box sx={{ p: 4, width: "100%", maxWidth: "75%", margin: "0" }}>
      {/* Intro Section */}
      <Box
        sx={{
          mb: 4,
          textAlign: "left",
          borderRadius: 2,
          backgroundColor: "#e1f1fd",
          p: 3,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Hi {userName} 👋
        </Typography>
        <Typography variant="body1">
          Welcome to your profile! Here, you can view a summary of your
          feedback, track your progress, and revisit detailed feedback for the
          cases you’ve completed.
        </Typography>
      </Box>

      {/* Summary Section */}
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          mb: 4,
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Feedback Summary
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFeedbackSummaryUpdate}
            disabled={feedbackSummaryUpdating}
            startIcon={
              feedbackSummaryUpdating ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : null
            }
          >
            {feedbackSummaryUpdating ? "Updating" : "Update"}
          </Button>
        </Box>

        {/* Feedback Content */}
        <ReactMarkdownTypography>{feedbackSummary}</ReactMarkdownTypography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Case List Section */}
      <Typography variant="h6" gutterBottom>
        Case Feedback
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click on a case below to view detailed feedback for completed cases.
      </Typography>
      <CaseList cases={cases} onCaseSelect={handleCaseSelect} />

      {/* Feedback Modal */}
      <FeedbackModal
        open={feedbackModalOpen}
        handleCloseModal={handleCloseModal}
        caseData={selectedCase}
        feedback={selectedCaseFeedback}
      />
    </Box>
  );
}
