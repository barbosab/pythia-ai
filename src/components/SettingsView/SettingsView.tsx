import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";

interface SettingsProps {
  onSettingsClick: (showSettings: boolean) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ onSettingsClick }) => {
  return (
    <div>
      <nav>
        <Button
          onClick={() => onSettingsClick(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          startIcon={<ArrowBack />}
        >
          Return to chatting with Pythia
        </Button>
      </nav>
      <div style={{ padding: "20px" }}>
        <h1>Settings</h1>
        <p>Coming soon! View and edit settings for the application here.</p>
      </div>
    </div>
  );
};

export default SettingsView;
