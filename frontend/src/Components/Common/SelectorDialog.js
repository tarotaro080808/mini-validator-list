import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import SelectableListItem from "./SelectableListItem";

const styles = theme => ({
  appBar: {},
  flex: {
    flex: 1,
    fontSize: "130%",
    marginLeft: "1rem"
  },
  root: {
    width: "100%"
  },
  list: {
    minWidth: "30rem"
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    maxHeight: "100vh",
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SelectorDialog extends React.Component {
  render() {
    const { classes, fullScreen, dia, onSelectItem, onClose } = this.props;
    const { items, selectedValue, title, open } = dia;

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          maxWidth="md"
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              {fullScreen && (
                <IconButton color="inherit" onClick={onClose} aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography
                variant="subheading"
                color="inherit"
                className={classes.flex}
              >
                {title}
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.content}>
            <List className={!fullScreen ? classes.list : undefined}>
              {items &&
                items.map((item, i) => (
                  <React.Fragment key={i}>
                    <SelectableListItem
                      leftPrimaryLabel={item.primaryLabel}
                      leftSecondaryLabel={item.secondaryLabel}
                      isChecked={selectedValue === item.value}
                      onItemSelect={() => onSelectItem(item)}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(SelectorDialog)
);
