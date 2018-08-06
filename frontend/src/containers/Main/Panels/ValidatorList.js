import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Table from "../../../components/ValidatorList/Table";

const styles = theme => ({
  wrapper: {
    width: "100%"
  }
});

class ValidatorList extends React.Component {
  render() {
    const { classes, vals, isLoading } = this.props;
    return (
      <div className={classes.wrapper} key="ValidatorList">
        <Paper>
          {!isLoading && vals.filteredValidators ? (
            <Table list={vals.filteredValidators} />
          ) : (
            <React.Fragment />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ValidatorList);
