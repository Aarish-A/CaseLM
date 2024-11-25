"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { cases } from "../../data/cases";
import CaseList from "../../components/CaseList";
import CaseDetail from "../../components/CaseDetail";
import CaseChat from "../../components/chat/CaseChat";

export default function CaseLM() {
  const [selectedCase, setSelectedCase] = useState(null);

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleBack = () => {
    setSelectedCase(null);
  };

  const handleFinish = () => {
    alert("Case completed!");
    setSelectedCase(null);
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
        <CaseChat onBack={handleBack} onFinish={handleFinish} />
      </>
    </Box>
  );
}
