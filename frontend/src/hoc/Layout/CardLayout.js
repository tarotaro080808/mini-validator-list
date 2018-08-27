import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({});

class CardLayout extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <Grid container spacing={0}>
        {children}
      </Grid>
    );
  }
}
export default withStyles(styles)(CardLayout);
