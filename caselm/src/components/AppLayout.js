import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  IconButton,
  Typography,
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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 175,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 175,
            boxSizing: "border-box",
            backgroundColor: "#1e1e2f",
            color: "#ffffff",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="div">
            CaseLM
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  color: pathname === item.path ? "#4caf50" : "#ffffff",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <IconButton
                  sx={{
                    color: pathname === item.path ? "#4caf50" : "#ffffff",
                  }}
                >
                  {navIcons[item.label]}
                </IconButton>
                <ListItemText
                  primary={item.label}
                  sx={{
                    ml: 1,
                    fontWeight: pathname === item.path ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {/* Full Reset Button */}
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button
            startIcon={<RestartAlt />}
            variant="contained"
            color="error"
            fullWidth
            onClick={handleOpenResetModal}
          >
            Full Reset
          </Button>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          margin: 0,
          backgroundColor: "#f5f5f5",
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
