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
  useMediaQuery,
} from "@mui/material";
import { Home, Assignment, Group, RestartAlt, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { clearLocalStorage } from "@/utils/localStorage";

export default function AppLayout({
  children,
  navItems,
  handleNavigation,
  pathname,
}) {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenResetModal = () => setResetModalOpen(true);
  const handleCloseResetModal = () => setResetModalOpen(false);
  const handleFullReset = () => {
    clearLocalStorage();
    handleNavigation("/");
    location.reload();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navIcons = {
    Profile: <Home />,
    CaseLM: <Assignment />,
    GroupLM: <Group />,
  };

  // Sidebar Content Component
  const DrawerContent = (
    <>
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
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        )}
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
                      px: 1,
                      py: 0,
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
                        fontWeight: pathname === item.path ? "bold" : "normal",
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
      <Button
        variant="contained"
        onClick={handleOpenResetModal}
        size="small"
        disableElevation
        color="error"
        sx={{
          py: 1,
          borderRadius: 2,
        }}
      >
        <RestartAlt sx={{ mr: 1 }} />
        Reset App
      </Button>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Mobile AppBar for Hamburger Menu */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "#f0f4f8",
            zIndex: theme.zIndex.drawer + 1,
            display: "flex",
            alignItems: "center",
            p: 1,
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            CaseLM
          </Typography>
        </Box>
      )}

      {/* Desktop Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "block" },
          width: isMobile ? "auto" : 185,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 185,
            boxSizing: "border-box",
            backgroundColor: "#f0f4f8",
            px: 2,
            py: 3,
            border: "none",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        {DrawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          padding: isMobile ? "56px 0 0 0" : 0, // Adjust padding for mobile header
          margin: 0,
          backgroundColor: "#f9fafc",
          flexShrinkY: 1,
          flexGrow: 1,
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
