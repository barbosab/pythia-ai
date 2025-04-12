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
            onClick={() => {
              window.electronAPI.setConfig(configDataState);
              window.electronAPI.requestConfig();
            }}
            disabled={
              configDataState.model === savedConfigDataState.model &&
              configDataState.personalityPrefix ===
                savedConfigDataState.personalityPrefix
            }
          >
            Save Config Changes
          </Button>
        </div>
        <div style={{ padding: "20px" }}>
          <h1>Upload to Vector Database</h1>
          <div style={{ paddingBottom: "20px" }}>
            This takes a csv file with a single string on each line and no
            header. Each line will be added as an entry to the Vectra vector
            database to be used by the AI.
          </div>
          <input
            accept=".csv"
            style={{ display: "none" }}
            id="upload-csv"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const csvContent = event.target?.result;
                  // console.log("CSV Content:", csvContent);
                  if (typeof csvContent === "string") {
                    console.log("CSV content is a string.");
                    window.electronAPI.addToVectra(csvContent);
                  } else {
                    console.error("CSV content is not a string.");
                  }
                  console.log("CSV file sent to Vectra");
                };
                reader.readAsText(file);
              }
            }}
          />
          <label htmlFor="upload-csv">
            <Button variant="contained" color="secondary" component="span">
              Upload CSV
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
