import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

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
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import FaIcon from "../../components/Common/FaIcon";

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
  selectedItemCheckIcon: {
    color: theme.palette.primary.contrastText
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

class SelectDialogContainer extends React.Component {
  handleSelect = (key, item) => {
    this.props.onSelectItem(item);
    this.props.dia.handleSelect(key, item.value);
  };

  render() {
    const { classes, fullScreen, dia, onClose } = this.props;
    const { items, title, open } = dia;

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
                  <FaIcon icon="fas fa-arrow-left" />
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
                items.options.map((item, i) => (
                  <div key={i}>
                    <ListItem
                      button
                      onClick={() => this.handleSelect(items.key, item)}
                    >
                      <ListItemText
                        primary={item.primaryLabel}
                        secondary={item.secondaryLabel}
                      />
                      {items.selectedValue === item.value && (
                        <FaIcon icon="fas fa-check" color="secondary" />
                      )}
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dia: state.selectDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectItem: item => dispatch(actions.selectDialogItem(item)),
    onClose: item => dispatch(actions.closeDialog(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles, { withTheme: true })(
    withMobileDialog()(SelectDialogContainer)
  )
);
