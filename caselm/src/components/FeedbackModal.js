import React from "react";
import {
  Box,
  Modal,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ReactMarkdownTypography from "./ReactMarkdownTypography";

export default function FeedbackModal({
  open,
  handleCloseModal,
  caseData,
  feedback,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if mobile

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#f9fafc",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: isMobile ? "95%" : "85%", // Narrower on mobile
          maxWidth: "70rem",
          maxHeight: "90%",
          overflowY: "auto",
          p: isMobile ? 2 : 4, // Adjust padding for mobile
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: isMobile ? 2 : 4,
            py: 2,
            mb: 2,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e9eef6",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"} // Smaller header on mobile
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              maxWidth: "90%", // Allow text to wrap
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: isMobile ? "1rem" : "1.5rem",
            }}
          >
            Your feedback for {caseData?.title}
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
            px: isMobile ? 2 : 4,
            py: isMobile ? 1 : 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            overflowWrap: "break-word",
            border: "1px solid #e9eef6",
          }}
        >
          {feedback ? (
            <ReactMarkdownTypography
              sx={{
                fontSize: isMobile ? "14px" : "16px", // Adjust font size
                color: "#4f5b62",
                lineHeight: 1.6,
              }}
            >
              {feedback}
            </ReactMarkdownTypography>
          ) : (
            <Typography
              sx={{
                fontSize: isMobile ? "12px" : "14px",
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
