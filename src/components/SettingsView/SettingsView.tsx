import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

interface SettingsProps {
  onSettingsClick: (showSettings: boolean) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ onSettingsClick }) => {
  const [savedConfigDataState, setSavedConfigDataState] = useState({
    model: "",
    personalityPrefix: "",
  });
  const [configDataState, setConfigDataState] = useState({
    model: "",
    personalityPrefix: "",
  });

  useEffect(() => {
    window.electronAPI.onConfigReply((event, data) => {
      setConfigDataState(data.content);
      setSavedConfigDataState(data.content);
    });
  }, []);

  useEffect(() => {
    window.electronAPI.requestConfig();
  }, []);

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
        <div style={{ padding: "10px" }}>
          <TextField
            id="outlined-read-only-input"
            label="model"
            value={configDataState.model}
            slotProps={{
              input: {
                readOnly: true,
                disabled: true,
              },
            }}
          />
          <Tooltip title="Changing the model is not supported yet.">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ padding: "10px" }}>
          <TextField
            label="Personality Prefix"
            multiline
            rows={4}
            value={configDataState.personalityPrefix}
            onChange={(e) =>
              setConfigDataState({
                ...configDataState,
                personalityPrefix: e.target.value,
              })
            }
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={{ padding: "8px", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("TODO - need to save config")}
            disabled={
              configDataState.model === savedConfigDataState.model &&
              configDataState.personalityPrefix ===
                savedConfigDataState.personalityPrefix
            }
          >
            Save Config Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
