import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import NestedList from "../../../components/Common/NestedList";

const styles = theme => ({
  wrapper: {
    width: "100%"
  }
});

class Component extends React.Component {
  render() {
    const { an, classes } = this.props;
    return an.referres ? (
      <div className={classes.wrapper}>
        <Paper>
          <NestedList title="Referrals" list={an.referres} />
        </Paper>
      </div>
    ) : (
      <React.Fragment />
    );
  }
}

const mapStateToProps = state => {
  return {
    an: state.analytics
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Component)
);
