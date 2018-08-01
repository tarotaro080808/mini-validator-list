import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import ExpandablePanel from "../../components/Common/ExpandablePanel";
import DomainMapPanel from "../../components/DomainMap/DomainMapPanel";

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
    return vals ? (
      <ExpandablePanel className={classes.panel} title="Map" expanded={false}>
        <div className={classes.wrapper}>
          <DomainMapPanel domains={vals} />
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
