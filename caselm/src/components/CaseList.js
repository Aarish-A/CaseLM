import React from "react";

import { List, ListItem, ListItemText } from "@mui/material";

export default function CaseList({ cases, onCaseSelect }) {
  return (
    <List>
      {cases.map((caseItem) => (
        <ListItem
          key={caseItem.id}
          sx={{
            backgroundColor: "#f9f9f9",
            marginBottom: 1,
            borderRadius: 1,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#f3f3f3",
            },
          }}
          onClick={() => onCaseSelect(caseItem)}
        >
          <ListItemText
            primary={caseItem.title}
            secondary={`Status: ${caseItem.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
