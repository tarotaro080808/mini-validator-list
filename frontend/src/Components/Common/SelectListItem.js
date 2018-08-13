import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  root: {
    width: "100%"
  },
  itemLabel: {},
  itemValue: {
    opacity: 0.8,
    textAlign: "right"
  }
});

class SelectListItem extends React.Component {
  handleOpen = item => {
    this.props.onOpen(item, this.props.handleSelect);
  };

  render() {
    const { classes, item } = this.props;
    return (
      <React.Fragment>
        <ListItem button onClick={() => this.handleOpen(item)}>
          <ListItemText primary={item.label} className={classes.itemLabel} />
          <ListItemText
            primary={item.selected.label}
            className={classes.itemValue}
          />
        </ListItem>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOpen: (items, handleSelect) =>
      dispatch(actions.openDialog("test1", items, handleSelect))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SelectListItem));
