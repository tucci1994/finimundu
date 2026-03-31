import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#fff",
    },
    background: {
      default: "#000",
      paper: "#000",
    },
  },
  typography: {
    fontFamily: '"NectoMono", monospace',
  },
});

export default theme;
