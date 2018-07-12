import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({});

function Layout(props) {
  const { classes, children } = props;
  const noMarginForSizes = ["xs", "sm"];
  return (
    <Grid container justify="center" className={classes.root} spacing={0}>
      <Hidden only={noMarginForSizes}>
        <Grid item md={2} />
      </Hidden>
      <Grid item md={8}>
        {children}
      </Grid>
      <Hidden only={noMarginForSizes}>
        <Grid item md={2} />
      </Hidden>
    </Grid>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
