import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CaseDetail({ caseData }) {
  if (!caseData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a case to view its details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "50%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
        {caseData.title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <iframe
          src={caseData.url}
          title={`Case: ${caseData.title}`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Box>
    </Box>
  );
}
