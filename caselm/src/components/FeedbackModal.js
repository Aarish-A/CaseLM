import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
          width: "80%",
          maxHeight: "80%",
          overflowY: "auto",
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
            variant="h6"
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
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Feedback Content */}
        <ReactMarkdownTypography>{feedback}</ReactMarkdownTypography>
      </Box>
    </Modal>
  );
}
