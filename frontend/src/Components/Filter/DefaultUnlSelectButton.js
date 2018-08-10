import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FullScreenSelect from "../Common/FullScreenSelect";

const styles = theme => ({
  button: {
    width: "100%"
  }
});

class DefaultUnlSelectButton extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes, archives, handleSelect } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.button}>
        <Button
          color="secondary"
          onClick={this.handleOpen}
          className={classes.button}
        >
          Load another default UNL
        </Button>
        <FullScreenSelect
          list={archives}
          selectTitle="Default UNL Archives"
          open={open}
          getListItemPrimaryText={item => item.date}
          getListItemSecondaryText={item => item.name}
          handleClose={this.handleClose}
          handleSelectItem={handleSelect}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DefaultUnlSelectButton);
