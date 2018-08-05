import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
  }
});

class Component extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open: open
    });
  };

  render() {
    const { title, classes, list, children } = this.props;

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
            <div className={classes.appBarTitle}>{title}</div>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
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

export default withStyles(styles)(Component);
