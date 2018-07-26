import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import ExpandablePanel from "../components/Common/ExpandablePanel";
import DomainMapPanel from "../components/DomainMap/DomainMapPanel";

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
    const { domainStats } = this.props.vals;
    return domainStats ? (
      <ExpandablePanel
        className={this.props.classes.panel}
        title="Map"
        expanded={false}
      >
        <div className={this.props.classes.wrapper}>
          <DomainMapPanel domains={domainStats} />
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
