import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

interface NavBarProps {
  onSettingsClick: (showSettings: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSettingsClick }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navLinks}></ul>
      <IconButton onClick={() => onSettingsClick(true)}>
        <SettingsIcon />
      </IconButton>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "1.5rem",
  },
  navLink: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
};

export default NavBar;
