import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, DeleteOutline } from "@mui/icons-material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (caseData.hasExample) {
      setTimeout(() => setShowTooltip(true), 2000);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  }, []);

  // Feedback Button Content
  const getFeedbackButtonContent = () => {
    if (feedbackLoading) return <CircularProgress size={20} color="inherit" />;
    return completed ? "View Feedback" : "Get Feedback";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "4rem",
        backgroundColor: "white",
        px: 2,
        py: 1,
      }}
    >
      {/* Left Section: Back Button + Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={onBack} color="primary">
          <ArrowBack sx={{ color: "black" }} />
        </IconButton>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexGrow: 1,
          }}
        >
          {caseData.title}
        </Typography>
      </Box>

      {/* Right Section: Buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Reset Chat (Trash Icon on Mobile) */}
        {isMobile ? (
          <IconButton onClick={onReset} color="error">
            <DeleteOutline />
          </IconButton>
        ) : (
          <Button
            onClick={onReset}
            variant="outlined"
            color="error"
            sx={{ borderRadius: 2 }}
          >
            Reset Chat
          </Button>
        )}

        {/* Feedback Button (Text stays consistent on Mobile and Desktop) */}
        <Tooltip
          title="Get some example feedback for this case"
          open={showTooltip}
          arrow
          disableHoverListener
        >
          <Button
            onClick={onFinish}
            variant="contained"
            color="success"
            disabled={disabled}
            size={isMobile ? "small" : "medium"}
            sx={{
              borderRadius: 2,
              px: isMobile ? 2 : 3, // Slight padding adjustment for mobile
            }}
            disableElevation
          >
            {getFeedbackButtonContent()}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
