import React from "react";
import { Box, Typography } from "@mui/material";

import ChatMessage from "./ChatMessage";

export default function ChatMessagesWindow({ chatHistory }) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
      }}
    >
      {chatHistory.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#999",
            textAlign: "center",
          }}
        >
          <Typography>
            Start your conversation here! Try asking questions like: <br />
            "What are the main challenges in this case?" <br />
            "What options do we have to solve them?"
          </Typography>
        </Box>
      ) : (
        chatHistory.map((chat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <ChatMessage
              isUser={chat.role == "user" ? true : false}
              message={chat.parts[0].text}
            />
          </Box>
        ))
      )}
    </Box>
  );
}
