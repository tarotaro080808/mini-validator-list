import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import ReferrersList from "./Panels/ReferrersList";

const styles = theme => ({
  main: {
    margin: theme.spacing.unit * 2
  },
  innerContent: {
    maxWidth: 900,
    margin: "0 auto"
  },
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  },
  gridItemBottom: {
    marginBottom: theme.spacing.unit * 1
  },
  tooltip: {
    fontFamily: ["'Montserrat'", "Roboto"].join(",")
  }
});

class Component extends React.Component {
  componentDidMount() {
    this.props.onInitReferrers();
  }

  render() {
    const { classes, an } = this.props;

    return (
      <React.Fragment>
        {an.ready ? (
          <React.Fragment>
            <Grid container spacing={0}>
              <Grid item xs={12} className={classes.gridItemBottom}>
                <ReferrersList />
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
    onInitReferrers: () => dispatch(actions.initReferrers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
