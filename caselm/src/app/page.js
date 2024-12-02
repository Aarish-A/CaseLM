"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import CaseList from "@/components/CaseList";
import FeedbackModal from "@/components/FeedbackModal";
import NameModal from "@/components/NameModal";
import ReactMarkdownTypography from "@/components/ReactMarkdownTypography";

import { cases } from "@/data/cases";
import {
  getCaseFeedback,
  caseFeedbackExists,
  getFeedbackSummary,
  saveFeedbackSummary,
  getAllCaseFeedbacks,
  getName,
} from "../utils/localStorage";

export default function Profile() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseFeedback, setSelectedCaseFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackSummary, setFeedbackSummary] = useState("");
  const [feedbackSummaryUpdating, setFeedbackSummaryUpdating] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setFeedbackSummary(
      getFeedbackSummary()
        ? getFeedbackSummary()
        : "Come back and update this summary once you have finished some cases!"
    );
    setName(getName() ? getName() : "");
  }, []);

  const handleOverlayClose = (name) => {
    setName(name);
  };

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
    <>
      <NameModal onClose={handleOverlayClose} />
      <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", py: 5 }}>
        {/* Intro Section */}
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            p: 4,
            mb: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Hi {name} 👋
          </Typography>
          <Typography variant="body1">
            Welcome to your profile! Here, you can view a summary of your
            feedback, track your progress, and revisit detailed feedback for the
            cases you’ve completed.
          </Typography>
        </Box>

        {/* Feedback Summary Section */}
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            p: 4,
            mb: 3,
          }}
        >
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
              disabled={
                feedbackSummaryUpdating ||
                Object.keys(getAllCaseFeedbacks()).length === 0
              }
              startIcon={
                feedbackSummaryUpdating ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : null
              }
            >
              {feedbackSummaryUpdating ? "Updating" : "Update"}
            </Button>
          </Box>
          <ReactMarkdownTypography>{feedbackSummary}</ReactMarkdownTypography>
        </Box>

        {/* Case List Section */}
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Case Feedback
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click on a case below to view detailed feedback for completed cases.
          </Typography>
          <CaseList cases={cases} onCaseSelect={handleCaseSelect} doneOnly />
        </Box>

        {/* Feedback Modal */}
        <FeedbackModal
          open={feedbackModalOpen}
          handleCloseModal={handleCloseModal}
          caseData={selectedCase}
          feedback={selectedCaseFeedback}
        />
      </Box>
    </>
  );
}
