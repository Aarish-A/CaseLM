import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ChatHeader({ onBack, onReset, onFinish }) {
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
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" /* Subtle shadow */,
        zIndex: "10",
      }}
    >
      <Button onClick={onBack} variant="contained" color="primary">
        Back
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onReset} variant="outlined" color="error">
          Reset Chat
        </Button>
        <Button onClick={onFinish} variant="contained" color="success">
          Finish
        </Button>
      </Box>
    </Box>
  );
}
