import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {},
  button: {
    color: theme.palette.secondary.main
  }
});

class MyButton extends React.Component {
  render() {
    const { classes, buttonText, onClick, disabled, className } = this.props;

    return (
      <Button
        disabled={disabled}
        onClick={onClick}
        className={className || classes.button}
        size="small"
      >
        {buttonText}
      </Button>
    );
  }
}

export default withStyles(styles)(MyButton);
