import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ChatHeader({ onBack, onReset, onFinish, finished }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "4rem",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "1px solid #cccccc",
      }}
    >
      <IconButton onClick={onBack} variant="contained" color="primary">
        <ArrowBackIcon sx={{ color: "black" }} />
      </IconButton>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onReset} variant="outlined" color="error">
          Reset Chat
        </Button>
        <Button onClick={onFinish} variant="contained" color="success">
          {finished ? "View Feedback" : "Get Feedback"}
        </Button>
      </Box>
    </Box>
  );
}
