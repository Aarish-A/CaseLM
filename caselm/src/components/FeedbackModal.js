import React from "react";
import { Box, Modal, IconButton, Typography } from "@mui/material";
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
          p: 3,
          width: "70%",
          maxHeight: "80%",
          overflowY: "auto",
          paddingX: 6,
          paddingY: 3,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderBottom: "1px solid #ccc",
            pb: 1,
          }}
        >
          <Typography
            id="feedback-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Case Feedback for: {caseData?.title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Box>

        {/* Feedback Content */}
        <ReactMarkdownTypography>{feedback}</ReactMarkdownTypography>
      </Box>
    </Modal>
  );
}
