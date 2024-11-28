import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
