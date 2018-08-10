import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FullScreenSelect from "../Common/FullScreenSelect";

const styles = theme => ({
  domain: {
    fontWeight: "bold"
  },
  button: {
    width: "100%"
  }
});

const formatDomainName = domain => {
  const region =
    (domain.city ? domain.city + " " : "") +
    (domain.region_name ? domain.region_name + " " : "");
  const country = domain.country_name ? domain.country_name : "";
  const fullName = (region ? region + ", " : "") + country;
  return fullName || "Unknown";
};

class DomainMapPanel extends React.Component {
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
    const { classes, domains, handleSelect } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.button}>
        <Button
          onClick={this.handleOpen}
          color="secondary"
          className={classes.button}
        >
          Locate domain
        </Button>
        <FullScreenSelect
          list={domains}
          selectTitle="Select Domain"
          open={open}
          getListItemPrimaryText={domain => domain.domain}
          getListItemSecondaryText={domain => formatDomainName(domain)}
          handleClose={this.handleClose}
          handleSelectItem={handleSelect}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DomainMapPanel);
