import React from "react";

import Img from "../../images/pythia.png";

const InitView: React.FC = () => {
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
        style={{ width: "250px", height: "250px", marginBottom: "20px" }}
      />
    </div>
  );
};

export default InitView;
