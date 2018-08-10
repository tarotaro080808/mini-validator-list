import React from "react";
import { withStyles } from "@material-ui/core/styles";
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

const styles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main
  },
  flex: {
    flex: 1
  },
  root: {
    width: "100%"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenSelect extends React.Component {
  state = {
    selected: undefined
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleSelectItem = selected => {
    this.props.handleSelectItem(selected);
    this.handleClose();
  };

  render() {
    const {
      classes,
      list,
      open,
      selectTitle,
      getListItemPrimaryText,
      getListItemSecondaryText
    } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar variant="dense">
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {selectTitle}
              </Typography>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {list && (
            <List>
              {list.map((item, i) => (
                <div key={i}>
                  <ListItem button onClick={() => this.handleSelectItem(item)}>
                    <ListItemText
                      primary={getListItemPrimaryText(item)}
                      secondary={getListItemSecondaryText(item)}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FullScreenSelect);
