import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";

import * as actions from "../../store/actions/index";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  appBarTitle: {
    fontFamily: "Pacifico, sans-serif",
    fontSize: "150%",
    width: "100%",
    textAlign: "center"
  },
  menuTitle: {
    fontFamily: "Pacifico, sans-serif",
    fontSize: "130%",
    textAlign: "center"
  },
  menuButton: {
    position: "fixed"
  },
  menuButtonRight: {
    position: "fixed",
    right: "1rem"
  }
});

class AppFrame extends React.Component {
  state = {
    drawerOpen: false,
  };

  componentDidMount() {
    this.props.onInitArchives();
  }

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  render() {
    const { title, classes, list, children, app } = this.props;
    const { drawerOpen } = this.state;
    const isArchiveMode = app.mode === "ARCHIVE";
    const nextThemeType = app.themeType === "dark" ? "light" : "dark";

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer(true)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.appBarTitle}>
              {isArchiveMode ? `Archive ${app.selectedDefaultUnl.date}` : title}
            </div>
            <IconButton
              color="inherit"
              aria-label="Toggle theme"
              onClick={() => this.props.onThemeTypeToggled(nextThemeType)}
              className={classes.menuButtonRight}
            >
              {nextThemeType === "dark" ? (
                <Icon className={classNames("far fa-moon")} />
              ) : (
                <Icon className={classNames("fas fa-moon")} />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {list}
          </div>
        </Drawer>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    ntf: state.notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitArchives: () => dispatch(actions.initArchives()),
    onThemeTypeToggled: themeType =>
      dispatch(actions.toggleThemeType(themeType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppFrame));
