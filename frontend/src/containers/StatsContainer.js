import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import ExpandablePanel from "../components/Common/ExpandablePanel";
import ResultStatsPanel from "../components/Stats/ResultStatsPanel";

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
    const { filteredValidators } = this.props.vals;
    return filteredValidators ? (
      <ExpandablePanel
        className={this.props.classes.panel}
        title="Stats"
        expanded={true}
      >
        <div className={this.props.classes.wrapper}>
          <ResultStatsPanel validators={filteredValidators} />
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
