import React from "react";
import { Box, Typography } from "@mui/material";

import CaseList from "@/components/CaseList";
import { cases } from "@/data/cases";

export default function ProfileCaseList({ handleCaseSelect }) {
  return (
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
        Click on a case below to view detailed feedback for completed cases.
      </Typography>
      <CaseList cases={cases} onCaseSelect={handleCaseSelect} doneOnly />
    </Box>
  );
}
