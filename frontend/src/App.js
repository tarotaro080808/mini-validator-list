import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./components/Footer/Footer";

const APP_TITLE = "Mini Validator List";

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
  typography: {
    fontFamily: ["'Montserrat'", "Roboto"].join(",")
  }
});

const withRoot = Component => props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...props} />
  </MuiThemeProvider>
);

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header title={APP_TITLE} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Component));
