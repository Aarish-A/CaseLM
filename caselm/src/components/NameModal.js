import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import { getName, saveName } from "@/utils/localStorage";

export default function NameModal({ onClose }) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const storedName = getName();
    if (storedName) setOpen(false);
  }, []);

  const handleConfirm = () => {
    if (name.trim()) {
      saveName(name.trim());
      setOpen(false);
      if (onClose) onClose(name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && name.trim()) {
      handleConfirm();
    }
  };

  return (
    <Modal
      open={open}
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
          p: 4,
          width: "400px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Welcome to the App
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            mb: 3,
            color: "#666",
          }}
        >
          Your data is securely stored locally in your browser, except for
          interactions with Gemini.
        </Typography>
        <TextField
          label="Enter Your Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            mb: 3,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleConfirm}
          disabled={!name.trim()}
          sx={{
            py: 1.5,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}
