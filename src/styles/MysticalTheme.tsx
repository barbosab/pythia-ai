import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50",
    },
    secondary: {
      main: "#2C3E50",
    },
  },
  typography: {
    fontFamily: "Lato, Arial, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#e0e0e0",
        },
      },
    },
  },
});
