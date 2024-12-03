import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function ChatHeader({
  onBack,
  onReset,
  onFinish,
  feedbackLoading,
  disabled,
  completed,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getFeedbackButtonText = () => {
    if (feedbackLoading) return <CircularProgress size={20} color="inherit" />;
    else if (completed) return "View Feedback";
    else return "Get Feedback";
  };

  const handleFeedbackClick = () => {
    if (!completed) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000); // Hide tooltip after 3 seconds
    }
    onFinish();
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
        <Tooltip
          title="Hold tight, usually takes 10-15 seconds"
          open={showTooltip}
          arrow
          disableHoverListener
        >
          <Button
            onClick={handleFeedbackClick}
            variant="contained"
            color="success"
            disabled={disabled}
          >
            {getFeedbackButtonText()}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
