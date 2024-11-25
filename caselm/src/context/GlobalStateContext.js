"use client";

import React, { createContext, useState, useContext } from "react";

// Create Context
const GlobalStateContext = createContext();
const GlobalStateUpdateContext = createContext();

// Custom Hooks for Access
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext);

// Provider Component
export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({
    userMetadata: {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Student",
    },
    userCaseStatus: {
      casesCompleted: [],
      feedback: {}, // e.g., { caseId: "Great analysis!" }
    },
  });

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateUpdateContext.Provider value={setState}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
