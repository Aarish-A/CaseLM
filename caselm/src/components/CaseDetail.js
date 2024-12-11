import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function CaseDetail({ caseData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: isMobile ? "100%" : "50%",
        bgcolor: "white",
      }}
    >
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
