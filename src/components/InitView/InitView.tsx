import React from "react";
import Img from "../../images/pythia.png";
import { Typography } from "@mui/material";

interface InitViewProps {
  statusText: string;
}

const InitView: React.FC<InitViewProps> = ({ statusText }) => {
  return (
    <div
      style={{
        backgroundColor: "#6A0DAD",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={Img}
        alt="Loading"
        style={{ width: "200px", height: "200px", marginBottom: "20px" }}
      />
      <Typography
        variant="h6"
        style={{ textAlign: "center", color: "#FFD700" }}
      >
        {statusText}
      </Typography>
    </div>
  );
};

export default InitView;
