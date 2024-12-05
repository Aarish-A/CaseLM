"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import FeedbackModal from "@/components/FeedbackModal";
import NameModal from "@/components/NameModal";
import ProfileIntro from "@/components/profile/ProfileIntro";
import ProfileCaseList from "@/components/profile/ProfileCaseList";
import ProfileFeedbackSummary from "@/components/profile/ProfileFeedbackSummary";
import ProfileIntroButtons from "@/components/profile/ProfileIntroButtons";

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
        : "Press the update button on the right to see your feedback!"
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
        <ProfileIntro name={name} />

        {/* Feedback Summary Section */}
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "60rem",
            margin: "0 auto",
            borderRadius: 4,
            p: 4,
            mb: 3,
          }}
        >
          {hasFeedback ? (
            <ProfileFeedbackSummary
              feedbackSummary={feedbackSummary}
              handleFeedbackSummaryUpdate={handleFeedbackSummaryUpdate}
              feedbackSummaryUpdating={feedbackSummaryUpdating}
            />
          ) : (
            <ProfileIntroButtons />
          )}
        </Box>

        {/* Case List Section */}
        {hasFeedback && <ProfileCaseList handleCaseSelect={handleCaseSelect} />}

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
