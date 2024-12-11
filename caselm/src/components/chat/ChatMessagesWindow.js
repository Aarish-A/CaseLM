import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import ChatMessage from "./ChatMessage";

export default function ChatMessagesWindow({
  chatHistory,
  onSendDefaultMessage,
  showExampleSnippitsLink = false,
}) {
  const defaultMessages = [
    "I'm not sure where to begin, could you help me out?",
    "What are the most important parts of this case to start?",
    "I've read the case and I'm ready. Where do we start?",
  ];

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        bgcolor: "white",
        position: "relative",
      }}
    >
      {/* Sticky Box */}
      {showExampleSnippitsLink && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            py: 1,
            px: 2,
            mx: 3,
            textAlign: "center",
            borderRadius: 3,
            border: 1,
            borderColor: "#afafaf",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            To see some insights on how this conversation went, check out the{" "}
            <Link
              href="https://github.com/Aarish-A/CaseLM/"
              target="_blank"
              rel="noopener"
            >
              GitHub README
            </Link>
            .
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {chatHistory.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Not sure where to start? Try these conversation starters:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {defaultMessages.map((message, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => onSendDefaultMessage(message)}
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  backgroundColor: "transparent",
                  color: "#9ea3a8",
                  borderColor: "#9ea3a8",
                  px: 3,
                  py: 1,
                  transition: "color 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    color: "#2c3e50",
                    backgroundColor: "#f4f6f8",
                  },
                }}
              >
                {message}
              </Button>
            ))}
          </Box>
        </Box>
      ) : (
        // Chat History
        chatHistory.map((chat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
              px: 2,
              py: 1,
            }}
          >
            <ChatMessage
              isUser={chat.role === "user"}
              message={chat.parts[0].text}
            />
          </Box>
        ))
      )}
    </Box>
  );
}
