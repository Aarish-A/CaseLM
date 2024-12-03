import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupIcon from "@mui/icons-material/Group";

export default function ProfileIntroButtons() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Complete a case to get started!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Once you've completed a case, you'll find a summary of your learning and
        progress here.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 6,
            px: 4,
            display: "flex",
            gap: 1,
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            ":hover": {
              boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
            },
          }}
          href="/caselm"
        >
          <ArrowForwardIcon sx={{ fontSize: 50, mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Explore CaseLM
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Dive into interactive case studies to develop critical thinking.
          </Typography>
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            py: 6,
            px: 4,
            gap: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
          disabled
        >
          <GroupIcon sx={{ fontSize: 50, mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Explore GroupLM
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Collaborate with others in dynamic case discussions.
          </Typography>
        </Button>
      </Box>
    </>
  );
}
