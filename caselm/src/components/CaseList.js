import React from "react";

import { List, ListItem, ListItemText } from "@mui/material";

export default function CaseList({ cases, onCaseSelect }) {
  return (
    <List>
      {cases.map((caseItem) => (
        <ListItem
          key={caseItem.id}
          sx={{
            backgroundColor: "white",
            marginBottom: 1,
            borderRadius: 1,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#fbfbfb",
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
