import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import ReferralsList from "./Panels/ReferralsList";

const styles = theme => ({});

class Component extends React.Component {
  componentDidMount() {
    this.props.onInitReferrals();
  }

  render() {
    const { an } = this.props;

    return (
      <React.Fragment>
        {an.ready ? (
          <React.Fragment>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <ReferralsList />
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <LinearProgress color="secondary" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    an: state.analytics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitReferrals: () => dispatch(actions.initReferrals())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
