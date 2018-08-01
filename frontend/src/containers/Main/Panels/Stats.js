import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import ResultStatsPanel from "../../../components/Stats/ResultStatsPanel";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  }
});

class Component extends React.Component {
  render() {
    const { classes, vals } = this.props;
    return vals.filteredValidators ? (
      <ExpandablePanel
        className={classes.panel}
        title="Stats"
        expanded={true}
      >
        <div className={classes.wrapper}>
          <ResultStatsPanel validators={vals.filteredValidators} />
        </div>
      </ExpandablePanel>
    ) : (
      <React.Fragment />
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
