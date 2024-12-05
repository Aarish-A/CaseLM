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
      }}
    >
      <Typography variant="h5" gutterBottom>
        Case Feedback
      </Typography>
      <CaseList cases={cases} onCaseSelect={handleCaseSelect} doneOnly />
    </Box>
  );
}
