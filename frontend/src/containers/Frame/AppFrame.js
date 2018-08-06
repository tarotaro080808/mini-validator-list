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
import FullScreenSelect from "../../components/Common/FullScreenSelect";

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
  appBarSecondary: {
    backgroundColor: theme.palette.secondary.main
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
    unlSelectOpen: false
  };

  componentDidMount() {
    this.props.onInitArchives();
  }

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  handleOpenUnlFileSelect = () => {
    if (this.props.app.selectedDefaultUnl) {
      this.props.onDefaultUnlUnselected();
    } else {
      this.setState({
        unlSelectOpen: true
      });
    }
  };

  handleCloseUnlFileSelect = () => {
    this.setState({
      unlSelectOpen: false
    });
  };

  handleSelectUnlFile = item => {
    this.props.onDefaultUnlSelected(item);
  };

  render() {
    const { title, classes, list, children, app } = this.props;
    const { drawerOpen, unlSelectOpen } = this.state;
    const isArchiveMode = app.mode === "ARCHIVE";

    return (
      <div>
        <AppBar
          position="fixed"
          className={isArchiveMode ? classes.appBarSecondary : classes.appBar}
        >
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
              {isArchiveMode ? "Archive Mode" : title}
            </div>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleOpenUnlFileSelect}
              className={classes.menuButtonRight}
            >
              {isArchiveMode ? (
                <Icon className={classNames("fas fa-times-circle")} />
              ) : (
                <Icon className={classNames("fas fa-history")} />
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
        {app.archives ? (
          <FullScreenSelect
            list={app.archives}
            selectTitle="Default UNL Archives"
            open={unlSelectOpen}
            getListItemPrimaryText={item => item.date}
            getListItemSecondaryText={item => item.name}
            handleClose={this.handleCloseUnlFileSelect}
            handleSelectItem={this.handleSelectUnlFile}
          />
        ) : (
          <React.Fragment />
        )}
        {children}
      </div>
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
    onInitArchives: () => dispatch(actions.initArchives()),
    onDefaultUnlSelected: item => dispatch(actions.selectDefaultUnl(item)),
    onDefaultUnlUnselected: () => dispatch(actions.unselectDefaultUnl())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppFrame));
