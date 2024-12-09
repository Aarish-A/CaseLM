import React from "react";
import { Box, Button, Typography, Divider, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupIcon from "@mui/icons-material/Group";

export default function ProfileIntroButtons() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Complete a case to get started!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Once you've completed a case with CaseLM or GroupLM, you can come back
        here to get a snapshot of your feedback so far.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          mt: 3,
        }}
      >
        {/* CaseLM Button */}
        <Button
          variant="contained"
          href="/caselm"
          fullWidth
          sx={{
            py: 5,
            px: 4,
            display: "flex",
            gap: 1.5,
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            background: "linear-gradient(135deg, #2F80ED, #56CCF2)",
            color: "white",
            transition: "all 0.3s ease-in-out",
            boxShadow: "none",
            ":hover": {
              transform: "scale(1.02)",
              boxShadow: "none",
            },
          }}
        >
          <ArrowForwardIcon
            sx={{ fontSize: 45, mb: 1, color: "rgba(255,255,255,0.9)" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Explore CaseLM
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Dive into interactive case studies to develop critical thinking.
          </Typography>
        </Button>

        {/* GroupLM Button with Tooltip */}
        <Tooltip title="Coming Soon" arrow placement="top">
          <span style={{ width: "100%" }}>
            <Button
              variant="contained"
              href="/caselm"
              fullWidth
              disabled
              sx={{
                py: 5,
                px: 4,
                display: "flex",
                gap: 1.5,
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 4,
                backgroundColor: "#f0f4f8",
                color: "#b0b8c4",
                cursor: "not-allowed",
                boxShadow: "none",
              }}
            >
              <GroupIcon sx={{ fontSize: 45, mb: 1, color: "#b0b8c4" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#a0a6b0",
                }}
              >
                Explore GroupLM
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#a0a6b0",
                }}
              >
                Collaborate with others in dynamic case discussions.
              </Typography>
            </Button>
          </span>
        </Tooltip>
      </Box>
    </>
  );
}
