import React from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function ChatHeader({
  onBack,
  onReset,
  onFinish,
  feedbackLoading,
  disabled,
  completed,
}) {
  const getFeedbackButtonText = () => {
    if (feedbackLoading) return <CircularProgress size={20} color="inherit" />;
    else if (completed) return "View Feedback";
    else return "Get Feedback";
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "4rem",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "1px solid #cccccc",
      }}
    >
      <IconButton onClick={onBack} variant="contained" color="primary">
        <ArrowBack sx={{ color: "black" }} />
      </IconButton>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onReset} variant="outlined" color="error">
          Reset Chat
        </Button>
        <Button
          onClick={onFinish}
          variant="contained"
          color="success"
          disabled={disabled}
        >
          {getFeedbackButtonText()}
        </Button>
      </Box>
    </Box>
  );
}
