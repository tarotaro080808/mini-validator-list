import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Table from "../components/ValidatorList/Table";

const styles = theme => ({
  wrapper: {
    width: "100%"
  }
});

class Component extends React.Component {
  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <Paper>
          <Table list={this.props.vals.filteredValidators} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vals: state.validators
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Component)
);
