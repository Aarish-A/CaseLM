import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function ProfileIntro({ name }) {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (name) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayName((prev) => name.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex >= name.length) {
          clearInterval(interval);
        }
      }, 100); // Speed of typing (100ms per letter)
      return () => clearInterval(interval);
    }
  }, [name]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        maxWidth: "60rem",
        margin: "0 auto",
        borderRadius: 4,
        p: 4,
        mb: 3,
        textAlign: "center",
        border: 1,
        borderColor: "#e9eef6",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Hi <span style={{ color: "#1876d2" }}>{displayName}</span> 👋
      </Typography>
      <Typography variant="body1">
        Welcome to CaseLM! On this page, you can view a summary of your
        feedback, track your progress, and revisit detailed feedback for the
        cases you’ve completed.
      </Typography>
    </Box>
  );
}
