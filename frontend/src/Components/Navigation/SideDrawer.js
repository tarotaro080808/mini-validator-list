import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";

import Hidden from "@material-ui/core/Hidden";
import NavigationItems from "./NavigationItems";

const styles = theme => ({
  drawerPaper: {
    width: theme.drawerWidth,
    zIndex: 1002,
    overflowX: "hidden"
  }
});

class SideDrawer extends React.Component {
  render() {
    const { classes, open, handleDrawerToggle } = this.props;

    const contentHiddenMdUp = (
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={open}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <NavigationItems handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    );

    const contentHiddenSmDown = (
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <NavigationItems />
      </Drawer>
    );

    return (
      <React.Fragment>
        <Hidden mdUp>{contentHiddenMdUp}</Hidden>
        <Hidden smDown implementation="css">
          {contentHiddenSmDown}
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SideDrawer);
