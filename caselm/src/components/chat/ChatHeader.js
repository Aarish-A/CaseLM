import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function ChatHeader({
  caseData,
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
      setTimeout(() => setShowTooltip(false), 7000); // Hide tooltip after x seconds
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
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={onBack} variant="contained" color="primary">
          <ArrowBack sx={{ color: "black" }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
          {caseData.title}
        </Typography>
      </Box>

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
