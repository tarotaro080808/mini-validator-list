import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { primaryContentListItems } from "./TileData";

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
    fontSize: "140%",
    textAlign: "center"
  },
  menuButton: {
    position: "fixed"
  }
});

class TemporaryDrawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open: open
    });
  };

  render() {
    const { title, classes, children } = this.props;

    const sideList = (
      <div className={classes.list}>
        <ListItem>
          <ListItemText
            primary={<div className={classes.menuTitle}>{title}</div>}
          />
        </ListItem>
        <Divider />
        <List>{primaryContentListItems}</List>
      </div>
    );

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
            {sideList}
          </div>
        </Drawer>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);
