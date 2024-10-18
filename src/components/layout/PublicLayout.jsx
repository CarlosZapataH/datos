import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { esES } from "@mui/material/locale";

const defaultTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#0039a6",
      },
      orange: {
        main: "#fb8c00",
        contrastText: "white",
      },
    },
  },
  esES
);

function PublicLayout({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

PublicLayout.propTypes = {
  window: PropTypes.func,
};

export default PublicLayout;
