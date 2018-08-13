import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  itemLabel: {},
  itemValue: {
    opacity: 0.8,
    textAlign: "right"
  },
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  }
});

const getSelectedLabel = item => {
  return item.options.filter(o => o.value === item.selectedValue)[0];
};

class SelectableListPanel extends React.Component {
  handleDialogOpen = item => {
    this.props.onDialogOpen(item);
  };

  render() {
    const { classes, items, title } = this.props;

    const elements = [];
    items.forEach((item, index) => {
      elements.push(<Divider key={`${title}-divider-${index}`} />);
      elements.push(
        <ListItem
          key={`${title}-listItem-${index}`}
          button
          onClick={() => this.handleDialogOpen(item)}
        >
          <ListItemText
            primary={item.primaryLabel}
            secondary={item.secondaryLabel}
            className={classes.itemLabel}
          />
          <ListItemText
            primary={getSelectedLabel(item).primaryLabel}
            className={classes.itemValue}
          />
        </ListItem>
      );
    });

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className={classes.wrapper}>
            <Paper>
              <List subheader={<ListSubheader>{title}</ListSubheader>}>
                {elements}
              </List>
            </Paper>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(SelectableListPanel);
