import React, { useState } from "react";
import { Box, CircularProgress, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [userMessage, setUserMessage] = useState("");

  // Handle the message send logic (click or Enter key)
  const handleSend = () => {
    if (userMessage.trim()) {
      onSendMessage(userMessage);
      setUserMessage(""); // Clear input after sending
    }
  };

  // Handle Enter key without Shift and button click
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault(); // Prevent newline on Enter
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 3,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask LearnLM..."
          variant="outlined"
          multiline
          maxRows={6}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          sx={{
            "& .MuiOutlinedInput-root": {
              pl: 4,
              pr: 8,
              borderRadius: 7,
              backgroundColor: "#f0f4f8",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f4f8",
              },
              "&.Mui-focused": {
                backgroundColor: "#e9eef6",
              },
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              color: "#000000",
              "&::placeholder": {
                color: "#5f6367",
              },
            },
          }}
        />
        <IconButton
          onClick={handleSend}
          disabled={isLoading}
          color="default"
          sx={{
            position: "absolute",
            right: 15,
            bottom: 8,
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
