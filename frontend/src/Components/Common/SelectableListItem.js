import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/CheckRounded";

const styles = theme => ({
  itemLabel: {},
  itemValue: {
    opacity: 0.8,
    textAlign: "right"
  }
});

class SelectableListItem extends React.Component {
  render() {
    const {
      classes,
      isChecked,
      leftPrimaryLabel,
      leftSecondaryLabel,
      rightPrimaryLabel,
      onItemSelect
    } = this.props;

    const leftItemText = (
      <ListItemText
        primary={leftPrimaryLabel}
        secondary={leftSecondaryLabel}
        className={classes.itemLabel}
      />
    );

    const rightItemText = rightPrimaryLabel ? (
      <ListItemText primary={rightPrimaryLabel} className={classes.itemValue} />
    ) : (
      <React.Fragment />
    );

    const checkMark = isChecked ? <CheckIcon color="action" /> : <React.Fragment />;

    return (
      <ListItem button onClick={onItemSelect ? onItemSelect : undefined}>
        {leftItemText}
        {rightItemText}
        {checkMark}
      </ListItem>
    );
  }
}

export default withStyles(styles)(SelectableListItem);
