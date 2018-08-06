import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AppFrame from "./containers/Frame/AppFrame";
import MainContainer from "./containers/Main/MainContainer";
// import ReferralsContainer from "./containers/Referrals/ReferralsContainer";
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
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2
  }
});

const routes = [
  {
    internal: true,
    path: "/",
    text: "List",
    exact: true,
    icon: "fas fa-list-alt",
    componentFactory: () => <MainContainer />
  },
  // {
  //   internal: true,
  //   path: "/referrals",
  //   text: "Referrals",
  //   exact: true,
  //   icon: "far fa-comments",
  //   componentFactory: () => <ReferralsContainer />
  // },
  {
    divider: true
  },
  {
    internal: false,
    path: "https://www.xrptipbot.com/u:CinnappleFun/n:twitter",
    text: "Donate",
    icon: "far fa-laugh-beam"
  }
];

const link = (route, index) => {
  const key = `menulink-${index}`;
  const listItem = (
    <ListItem button>
      <ListItemIcon>
        <Icon className={classNames(route.icon)} color="primary" />
      </ListItemIcon>
      <ListItemText primary={route.text} />
    </ListItem>
  );

  if (route.internal) {
    return (
      <Link key={key} to={route.path} style={{ textDecoration: "none" }}>
        {listItem}
      </Link>
    );
  } else {
    return (
      <a key={key} href={route.path} style={{ textDecoration: "none" }}>
        {listItem}
      </a>
    );
  }
};

class App extends React.Component {
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
        {routes
          .filter(r => !r.hidden)
          .map((r, i) => (r.divider ? <Divider key={i} /> : link(r, i)))}
      </div>
    );

    return (
      <Router>
        <AppFrame title={APP_TITLE} list={list}>
          <main className={classes.main}>
            <Switch>
              {routes
                .filter(r => r.internal)
                .map((r, i) => (
                  <Route
                    key={`route-${i}`}
                    exact={r.exact}
                    path={r.path}
                    component={r.componentFactory}
                  />
                ))}
              <Redirect from="*" to="/" />
            </Switch>
          </main>
          <Footer />
        </AppFrame>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(App));
