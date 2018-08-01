import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  appBarTitle: {
    fontFamily: "Pacifico, sans-serif",
    fontSize: "150%",
    width: "100%",
    textAlign: "center"
  }
});

function Component(props) {
  const { classes, title } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <div className={classes.appBarTitle}>{title}</div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Component);
