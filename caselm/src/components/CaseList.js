import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ButtonBase,
} from "@mui/material";

import { caseFeedbackExists, getChatHistory } from "@/utils/localStorage";

export default function CaseList({ cases, onCaseSelect, doneOnly }) {
  const getCaseStatus = (caseId) => {
    if (caseFeedbackExists(caseId)) return { label: "Done", color: "#4caf50" }; // Green
    if (getChatHistory(caseId).length > 0)
      return { label: "Continue", color: "#ff9800" }; // Orange
    return { label: "Not Started", color: "#f44336" }; // Red
  };

  return (
    <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
      {cases
        .filter((caseItem) =>
          doneOnly ? caseFeedbackExists(caseItem.id) : true
        )
        .map((caseItem) => {
          const status = getCaseStatus(caseItem.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={caseItem.id}>
              <ButtonBase
                onClick={() => onCaseSelect(caseItem)}
                sx={{ width: "100%", textAlign: "left" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    ":hover": {
                      transform: "scale(1.02)",
                    },
                    minHeight: "250px", // Ensures consistent card heights
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1, // Ensures content takes up available space
                    }}
                  >
                    {/* Title */}
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // Limits title to two lines
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {caseItem.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Limits description to three lines
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {caseItem.description ||
                        "Placeholder description for the case. This will summarize the case content in one or two lines."}
                    </Typography>

                    {/* Tags */}
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {caseItem.tags &&
                        caseItem.tags.map((tag, index) => (
                          <Box
                            key={index}
                            sx={{
                              backgroundColor: "#f1f1f1",
                              color: "#555",
                              borderRadius: "12px",
                              padding: "2px 8px",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              border: "1px solid #ddd",
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                    </Box>
                  </CardContent>

                  {/* Status Bar */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: status.color,
                      color: "white",
                      py: 1,
                      borderRadius: "0 0 8px 8px", // Rounded bottom corners
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {status.label}
                    </Typography>
                  </Box>
                </Card>
              </ButtonBase>
            </Grid>
          );
        })}
    </Grid>
  );
}
