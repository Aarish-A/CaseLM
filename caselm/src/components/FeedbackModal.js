import React from "react";
import { Box, Modal, IconButton, Typography, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";

import ReactMarkdownTypography from "./ReactMarkdownTypography";

export default function FeedbackModal({
  open,
  handleCloseModal,
  caseData,
  feedback,
}) {
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          width: "70%",
          maxHeight: "80%",
          overflowY: "auto",
          padding: 4,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderRadius: "8px",
            padding: "8px 16px",
          }}
        >
          <Typography
            id="feedback-modal-title"
            variant="h5"
            sx={{
              fontWeight: "bold",
              maxWidth: "85%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Case Feedback: {caseData?.title}
          </Typography>
          <IconButton
            edge="end"
            onClick={handleCloseModal}
            sx={{
              color: "black",
              transition: "color 0.1s ease-in-out",
              ":hover": {
                color: "error.main",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Feedback Content */}
        <Box
          sx={{
            padding: 3,
            border: "none",
            overflowWrap: "break-word",
          }}
        >
          {feedback ? (
            <ReactMarkdownTypography>{feedback}</ReactMarkdownTypography>
          ) : (
            <Typography color="text.secondary">
              No feedback available for this case.
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
