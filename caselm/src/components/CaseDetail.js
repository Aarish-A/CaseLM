import React from "react";
import { Box, Typography } from "@mui/material";

export default function CaseDetail({ caseData }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "50%",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {caseData.title}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, p: 2 }}>
        <iframe
          src={caseData.url}
          title={`Case: ${caseData.title}`}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        />
      </Box>
    </Box>
  );
}
