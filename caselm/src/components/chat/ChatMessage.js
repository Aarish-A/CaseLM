import React from "react";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MarkdownComponents = {
  p: ({ children }) => (
    <Typography variant="body1" sx={{ marginBottom: 1 }}>
      {children}
    </Typography>
  ),
  strong: ({ children }) => (
    <Typography component="span" sx={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ paddingLeft: 4, marginBottom: 1 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ marginBottom: 0.5 }}>
      {children}
    </Typography>
  ),
};

export default function ChatMessage({ message, isUser }) {
  return (
    <Box
      sx={{
        marginY: 1,
        padding: 2,
        borderRadius: 2,
        backgroundColor: isUser ? "primary.main" : "grey.200",
        color: isUser ? "white" : "black",
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
      }}
    >
      <ReactMarkdown components={MarkdownComponents}>{message}</ReactMarkdown>
    </Box>
  );
}
