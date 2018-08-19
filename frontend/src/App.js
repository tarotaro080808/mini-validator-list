import React from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { t, res } from "./services/i18nService";
import Layout from "./hoc/Layout/Layout";

import MainContainer from "./containers/Main/MainContainer";
import SettingsContainer from "./containers/Settings/SettingsContainer";
import SelectDialogContainer from "./containers/Common/SelectDialogContainer";
import NetworkProgressContainer from "./containers/Common/NetworkProgressContainer";

const createDynamicMuiTheme = type => {
  return createMuiTheme({
    palette: {
      type: type,
      primary: {
        main: type === "dark" ? "#303030" : "#2C3E50"
      },
      secondary: {
        main: "#18BC9C"
      }
    },
    typography: {
      fontFamily: ["'Roboto'", "sans-serif"].join(",")
    },
    drawerWidth: 250
  });
};

class App extends React.Component {
  render() {
    const { app, location, onChangeLanguage, onDialogOpen } = this.props;

    const routes = (
      <Switch>
        <Route exact path="/" component={() => <MainContainer />} />
        <Route exact path="/settings" component={() => <SettingsContainer />} />
        <Redirect from="*" to="/" />
      </Switch>
    );

    return (
      <MuiThemeProvider theme={createDynamicMuiTheme(app.themeType)}>
        <CssBaseline />
        <NetworkProgressContainer />
        <Layout
          app={app}
          title={t(res.APP_TITLE)}
          pathname={location.pathname}
          onChangeLanguage={onChangeLanguage}
          onDialogOpen={onDialogOpen}
        >
          {routes}
        </Layout>
        <SelectDialogContainer />
        {/* <NotificationContainer /> */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeLanguage: lang => dispatch(actions.setLanguage(lang)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(
        actions.openDialog({
          title,
          items,
          handleSelect,
          selectedValue
        })
      )
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
