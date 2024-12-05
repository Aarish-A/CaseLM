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
          bgcolor: "#f9fafc",
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "85%",
          maxWidth: "70rem",
          maxHeight: "90%",
          overflowY: "auto",
          p: 6,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 0,
            pb: 2,
          }}
        >
          <Typography
            id="feedback-modal-title"
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              maxWidth: "80%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Feedback for: {caseData?.title}
          </Typography>
          <IconButton
            edge="end"
            onClick={handleCloseModal}
            sx={{
              color: "#9ea3a8",
              transition: "color 0.2s ease-in-out",
              ":hover": {
                color: "error.main",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Feedback Content */}
        <Box
          sx={{
            p: 4,
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
            overflowWrap: "break-word",
          }}
        >
          {feedback ? (
            <ReactMarkdownTypography
              sx={{
                fontSize: "16px",
                color: "#4f5b62",
                lineHeight: 1.6,
              }}
            >
              {feedback}
            </ReactMarkdownTypography>
          ) : (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#9ea3a8",
                textAlign: "center",
              }}
            >
              No feedback available for this case.
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
