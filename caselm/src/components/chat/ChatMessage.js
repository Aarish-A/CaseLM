import React from "react";
import { Box } from "@mui/material";

import ReactMarkdownTypography from "../ReactMarkdownTypography";

export default function ChatMessage({ message, isUser }) {
  return (
    <Box
      sx={{
        marginY: 1,
        paddingX: 3,
        paddingY: 2,
        borderRadius: "1rem",
        backgroundColor: isUser ? "#e3f2fd" : "#f5f5f5",
        color: isUser ? "#000" : "#333",
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
      }}
    >
      <ReactMarkdownTypography>{message}</ReactMarkdownTypography>
    </Box>
  );
}
