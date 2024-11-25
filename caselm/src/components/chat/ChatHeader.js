import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ChatHeader({ onBack, onFinish }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Button onClick={onBack} variant="contained" color="primary">
        Back
      </Button>
      <Button onClick={onFinish} variant="contained" color="success">
        Finish
      </Button>
    </Box>
  );
}
