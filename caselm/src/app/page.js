"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CaseList from "../components/CaseList";
import FeedbackModal from "../components/FeedbackModal";
import { cases } from "../data/cases";
import { getCaseFeedback, caseFeedbackExists } from "../utils/localStorage";

export default function Profile() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseFeedback, setSelectedCaseFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const userName = "Aarish"; // Hardcoded for now

  // Example hardcoded summary feedback
  const summarizedFeedback = `Your analysis has shown great improvements in breaking down case challenges and identifying solutions. However, focus more on articulating leadership decisions and considering alternative perspectives.`;

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

  return (
    <Box sx={{ p: 4, width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {/* Intro Section */}
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
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
        }}
      >
        <Typography variant="h5" gutterBottom>
          Feedback Summary
        </Typography>
        <Typography variant="body1">{summarizedFeedback}</Typography>
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
