import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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
        marginTop: 0,
        padding: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Type your message..."
        variant="outlined"
        multiline
        maxRows={6}
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            padding: "8px",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={isLoading}
        sx={{ marginLeft: 1 }}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Send"}
      </Button>
    </Box>
  );
}
