import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    selected: undefined
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReset = () => {
    this.props.handleReset();
    this.handleClose();
  };

  handleSelectItem = selected => {
    this.props.handleSelectDomain(selected);
    this.handleClose();
  };

  formatDomainName = domain => {
    const region =
      (domain.city ? domain.city + " " : "") +
      (domain.region_name ? domain.region_name + " " : "");
    const country = domain.country_name ? domain.country_name : "";
    const fullName = (region ? region + ", " : "") + country;
    return fullName || "Unknown";
  };

  render() {
    const { classes, domains } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          size="small"
          onClick={this.handleClickOpen}
          style={{ width: "100%", backgroundColor: "#eee", marginTop: "1rem" }}
        >
          {this.state.selected || "Locate Domain"}
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Domains
              </Typography>
              <Button color="inherit" onClick={this.handleReset}>
                Reset
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            {domains.map(d => (
              <div>
                <ListItem button onClick={() => this.handleSelectItem(d)}>
                  <ListItemText
                    primary={d.domain}
                    secondary={this.formatDomainName(d)}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
