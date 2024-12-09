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
        borderRadius: 4,
        p: 4,
        border: 1,
        borderColor: "#e9eef6",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2.5 }} gutterBottom>
        Case Feedback
      </Typography>
      <CaseList cases={cases} onCaseSelect={handleCaseSelect} doneOnly />
    </Box>
  );
}
