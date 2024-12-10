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
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          background: "linear-gradient(135deg, #f7f9fc, #f0f4f8)",
          borderRadius: 4,
          p: 6,
          width: "100%",
          maxWidth: "25rem",
          textAlign: "center",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 1,
          }}
        >
          Welcome to CaseLM!
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body2"
          sx={{
            color: "#5f6367",
            mb: 4,
          }}
        >
          Your data is stored locally in your browser. Only Gemini interactions
          are sent to a server.
        </Typography>

        {/* Input Field */}
        <TextField
          placeholder="Enter your name"
          variant="filled"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            mb: 3,
            backgroundColor: "#f0f4f8",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#e9eef6" },
            "&.Mui-focused": { backgroundColor: "#e9eef6" },
            input: {
              color: "#333",
              fontSize: "16px",
              padding: "12px",
            },
          }}
        />

        {/* Confirm Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          disabled={!name.trim()}
          sx={{
            py: 1.5,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            background: !name.trim()
              ? "#e0e4e9"
              : "linear-gradient(135deg, #2F80ED, #56CCF2)",
            color: !name.trim() ? "#a0a6b0" : "white",
            transition: "all 0.3s ease-in-out",
            ":hover": {
              background:
                name.trim() && "linear-gradient(135deg, #2F80ED, #56CCF2)",
            },
          }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}
