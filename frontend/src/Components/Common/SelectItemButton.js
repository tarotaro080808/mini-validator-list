import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    textAlign: "right",
    width: "100%"
  },
  button: {}
});

class DefaultUnlSelectButton extends React.Component {
  handleDialogOpen = () => {
    this.props.onDialogOpen();
  };

  render() {
    const { classes, buttonText } = this.props;

    return (
      <div className={classes.root}>
        <Button
          color="secondary"
          onClick={this.handleDialogOpen}
          className={classes.button}
          size="small"
        >
          {buttonText}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DefaultUnlSelectButton);
