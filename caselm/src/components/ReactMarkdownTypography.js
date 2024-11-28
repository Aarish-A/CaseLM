import React from "react";
import ReactMarkdown from "react-markdown";
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
    <Typography
      component="ul"
      variant="body2"
      sx={{
        paddingLeft: 4,
        marginBottom: 1,
      }}
    >
      {children}
    </Typography>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ marginBottom: 1 }}>
      {children}
    </Typography>
  ),
};

export default function ReactMarkdownTypography({ children }) {
  return (
    <ReactMarkdown components={MarkdownComponents}>{children}</ReactMarkdown>
  );
}
