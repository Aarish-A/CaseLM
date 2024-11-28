import React from "react";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MarkdownComponents = {
  p: ({ children }) => (
    <Typography
      variant="body2"
      sx={{
        marginBottom: 0,
        "&:not(:last-child)": {
          marginBottom: 1.5,
        },
      }}
    >
      {children}
    </Typography>
  ),
  strong: ({ children }) => (
    <Typography component="span" variant="body2" sx={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Box
      component="ul"
      variant="body2"
      sx={{
        paddingLeft: 4,
        marginBottom: 1,
      }}
    >
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ marginBottom: 1 }}>
      {children}
    </Typography>
  ),
};

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
      <ReactMarkdown components={MarkdownComponents}>{message}</ReactMarkdown>
    </Box>
  );
}
