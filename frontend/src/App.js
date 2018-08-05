import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import AppFrame from "./containers/Frame/AppFrame";
import Main from "./containers/Main/Main";
import Referrers from "./containers/Referrers/Referrers";
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
  },
  menuTitle: {
    fontFamily: "Pacifico, sans-serif",
    fontSize: "130%",
    textAlign: "center"
  },
  list: {
    width: 250
  },
  main: {
    maxWidth: 900,
    margin: "0 auto",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 8
  }
});

const routes = [
  {
    path: "/",
    text: "Main",
    exact: true,
    componentFactory: () => <Main />
  },
  {
    path: "/referrers",
    text: "Referres",
    exact: true,
    componentFactory: () => <Referrers />
  }
];

class Component extends React.Component {
  render() {
    const { classes } = this.props;

    const list = (
      <div className={classes.list}>
        <ListItem>
          <ListItemText
            primary={<div className={classes.menuTitle}>{APP_TITLE}</div>}
          />
        </ListItem>
        <Divider />
        {routes.map((r, i) => (
          <Link key={i} to={r.path} style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemText primary={r.text} />
            </ListItem>
          </Link>
        ))}
        <Divider />
        <a
          href="https://www.xrptipbot.com/u:CinnappleFun/n:twitter"
          style={{ textDecoration: "none" }}
        >
          <ListItem button>
            <ListItemText primary="Donate" />
          </ListItem>
        </a>
      </div>
    );

    return (
      <Router>
        <AppFrame title={APP_TITLE} list={list}>
          <main className={classes.main}>
            {routes.map((r, i) => (
              <Route
                key={i}
                exact={r.exact}
                path={r.path}
                component={r.componentFactory}
              />
            ))}
          </main>
          <Footer />
        </AppFrame>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(Component));
