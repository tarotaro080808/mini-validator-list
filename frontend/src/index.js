import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./Components/Main";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#CFD8DC",
      main: "#2C3E50",
      dark: "#455A64",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#18BC9C"
    },
    text: {
      primary: "#2C3E50"
    }
  },
  titleFontFamily: "Pacifico, sans-serif",
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "'Montserrat'",
      "Roboto",
    ].join(",")
  }
});

ReactDOM.render(
  <React.Fragment>
    <CssBaseline>
      <MuiThemeProvider theme={theme}>
        <Main title="Mini Validator List" />
      </MuiThemeProvider>
    </CssBaseline>
  </React.Fragment>,
  document.getElementById("app")
);

module.hot.accept();
