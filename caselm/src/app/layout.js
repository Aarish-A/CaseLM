"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { CssBaseline } from "@mui/material";

import AppLayout from "../components/AppLayout";

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
          <AppLayout
            navItems={navItems}
            handleNavigation={handleNavigation}
            pathname={pathname}
          >
            {children}
          </AppLayout>
        </CssBaseline>
      </body>
    </html>
  );
};

export default Layout;
