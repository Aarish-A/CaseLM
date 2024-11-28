import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CaseDetail({ caseData }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "4rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
          borderBottom: "1px solid #cccccc",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
          }}
        >
          {caseData.title}
        </Typography>
      </Box>

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
