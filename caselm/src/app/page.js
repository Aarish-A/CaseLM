"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupIcon from "@mui/icons-material/Group";

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

  async function* streamChunks(reader, decoder) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  }

  const hasFeedback = Object.keys(getAllCaseFeedbacks()).length > 0;

  return (
    <>
      <NameModal onClose={handleOverlayClose} />
      <Box sx={{ backgroundColor: "#f9fafc", minHeight: "100vh", py: 5 }}>
        {/* Intro Section */}
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            p: 4,
            mb: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Hi {name} 👋
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Welcome to your profile! View your feedback, track progress, and
            revisit your learning journey.
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
          {hasFeedback ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5">Feedback Summary</Typography>
                <Box sx={{ textAlign: "right" }}>
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
                    sx={{
                      animation:
                        feedbackSummary ===
                        "Come back and update this summary once you have finished some cases!"
                          ? "pulse 2s infinite"
                          : "none",
                      "@keyframes pulse": {
                        "0%": { boxShadow: "0 0 0 0 rgba(63, 81, 181, 0.5)" },
                        "70%": { boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)" },
                        "100%": { boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)" },
                      },
                    }}
                  >
                    {feedbackSummaryUpdating ? "Updating" : "Update"}
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ my: 3 }} />
              <ReactMarkdownTypography>
                {feedbackSummary}
              </ReactMarkdownTypography>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Complete a case to get started!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once you've completed a case, you'll find a summary of your
                learning and progress here.
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 6,
                    px: 4,
                    display: "flex",
                    gap: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    ":hover": {
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
                    },
                  }}
                  href="/caselm"
                >
                  <ArrowForwardIcon sx={{ fontSize: 50, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Explore CaseLM
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Dive into interactive case studies to develop critical
                    thinking.
                  </Typography>
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    py: 6,
                    px: 4,
                    gap: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  }}
                  disabled
                >
                  <GroupIcon sx={{ fontSize: 50, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Explore GroupLM
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Collaborate with others in dynamic case discussions.
                  </Typography>
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* Case List Section */}
        {hasFeedback && (
          <Box
            sx={{
              backgroundColor: "white",
              maxWidth: "60rem",
              margin: "0 auto",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Case Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Click on a case below to view detailed feedback for completed
              cases.
            </Typography>
            <CaseList cases={cases} onCaseSelect={handleCaseSelect} doneOnly />
          </Box>
        )}

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
