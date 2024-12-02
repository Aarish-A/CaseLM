import React from "react";
import { Box } from "@mui/material";

import ReactMarkdownTypography from "../ReactMarkdownTypography";

export default function ChatMessage({ message, isUser }) {
  return (
    <Box
      sx={{
        marginY: 0,
        paddingX: 2,
        paddingY: 1,
        borderRadius: 3,
        backgroundColor: isUser ? "primary.main" : "grey.200",
        color: isUser ? "white" : "black",
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
        overflowWrap: "break-word",
      }}
    >
      <ReactMarkdownTypography>{message}</ReactMarkdownTypography>
    </Box>
  );
}
