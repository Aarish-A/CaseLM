"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const navItems = [
  { label: "Profile", path: "/" },
  { label: "CaseLM", path: "/caselm" },
  { label: "GroupLM", path: "/grouplm" },
];

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <html lang="en">
      <body>
        <CssBaseline>
          <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <Drawer
              variant="permanent"
              sx={{
                width: 180,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 180, boxSizing: "border-box" },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" align="left">
                  LearnLM
                </Typography>
              </Box>
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      selected={pathname === item.path}
                    >
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
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
          </Box>
        </CssBaseline>
      </body>
    </html>
  );
};

export default Layout;
