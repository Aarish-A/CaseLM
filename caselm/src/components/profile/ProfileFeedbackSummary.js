import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";

import ReactMarkdownTypography from "@/components/ReactMarkdownTypography";

export default function ProfileFeedbackSummary({
  feedbackSummary,
  handleFeedbackSummaryUpdate,
  feedbackSummaryUpdating,
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Feedback Summary</Typography>
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFeedbackSummaryUpdate}
            disabled={feedbackSummaryUpdating}
            startIcon={
              feedbackSummaryUpdating ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : null
            }
            sx={{
              animation:
                feedbackSummary ===
                "Come back and update this summary once you have finished some cases!"
                  ? "pulse 2s infinite"
                  : "none",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(63, 81, 181, 0.5)" },
                "70%": { boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)" },
              },
            }}
          >
            {feedbackSummaryUpdating ? "Updating" : "Update"}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <ReactMarkdownTypography>{feedbackSummary}</ReactMarkdownTypography>
    </>
  );
}