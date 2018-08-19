import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  gridItem: {
    marginBottom: theme.spacing.unit * 1
  }
});

class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <Grid container spacing={0}>
        {children.map((child, index) => (
          <Grid item key={index} xs={12} className={classes.gridItem}>
            {child}
          </Grid>
        ))}
      </Grid>
    );
  }
}
export default withStyles(styles)(Layout);
