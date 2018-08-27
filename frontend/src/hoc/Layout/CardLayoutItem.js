import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = theme => {
  const gridItemBase = {
    marginBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  };
  return {
    gridItem: {
      ...gridItemBase
    },
    gridItemTop: {
      ...gridItemBase,
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing.unit * 2
      }
    }
  };
};

class CardLayoutItem extends React.Component {
  render() {
    const { classes, children, sm, isTop } = this.props;

    return (
      <Grid
        item
        xs={12}
        sm={sm}
        className={isTop ? classes.gridItemTop : classes.gridItem}
      >
        {children}
      </Grid>
    );
  }
}
export default withStyles(styles)(CardLayoutItem);
