import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Tooltip,
  Typography,
  Modal,
} from "@mui/material";
import { Home, Assignment, Group, RestartAlt } from "@mui/icons-material";

import { clearLocalStorage } from "@/utils/localStorage";

export default function AppLayout({
  children,
  navItems,
  handleNavigation,
  pathname,
}) {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleOpenResetModal = () => setResetModalOpen(true);
  const handleCloseResetModal = () => setResetModalOpen(false);
  const handleFullReset = () => {
    clearLocalStorage();
    handleNavigation("/");
    location.reload();
  };

  const navIcons = {
    Profile: <Home />,
    CaseLM: <Assignment />,
    GroupLM: <Group />,
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#ffffff" }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#f0f4f8",
            px: 2,
            py: 3,
            border: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            mb: 2,
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            CaseLM
          </Typography>
        </Box>
        <List>
          {navItems.map((item) => {
            const isDisabled = item.label === "GroupLM";
            return (
              <ListItem key={item.label} disablePadding>
                <Tooltip
                  title={isDisabled ? "Coming Soon" : ""}
                  arrow
                  placement="right"
                >
                  <span style={{ width: "100%" }}>
                    <ListItemButton
                      onClick={() => !isDisabled && handleNavigation(item.path)}
                      selected={pathname === item.path && !isDisabled}
                      disabled={isDisabled}
                      sx={{
                        borderRadius: 3,
                        color: isDisabled
                          ? "#303030"
                          : pathname === item.path
                          ? "#000000"
                          : "#454746",
                        backgroundColor: isDisabled
                          ? "transparent"
                          : pathname === item.path
                          ? "#d3e2fd"
                          : "transparent",
                        "&:hover": {
                          backgroundColor:
                            isDisabled || pathname === item.path
                              ? "transparent"
                              : "#e5e7eb",
                        },
                        px: 2,
                        mb: 1,
                        pointerEvents: isDisabled ? "none" : "auto",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: pathname === item.path ? "#000000" : "#454746",
                        }}
                      >
                        {navIcons[item.label]}
                      </IconButton>
                      <Typography
                        sx={{
                          fontWeight:
                            pathname === item.path ? "bold" : "normal",
                          ml: 1,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </ListItemButton>
                  </span>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {/* App Reset Button */}
        <Button
          variant="contained"
          onClick={handleOpenResetModal}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: "20px",
            backgroundColor: "#ffcbda",
            color: "black",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
              color: "red",
            },
          }}
        >
          <RestartAlt sx={{ mr: 1 }} />
          Reset App
        </Button>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          margin: 0,
          backgroundColor: "#f9fafc",
        }}
      >
        {children}
      </Box>

      {/* Reset Confirmation Modal */}
      <Modal open={resetModalOpen} onClose={handleCloseResetModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Reset
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Are you sure you want to reset all local data? This action cannot be
            undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handleCloseResetModal}
              sx={{ width: "48%" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleFullReset}
              sx={{ width: "48%" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
