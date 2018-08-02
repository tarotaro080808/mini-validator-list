import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Tooltip } from "redux-tooltip";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import Filter from "./Panels/Filter";
import Stats from "./Panels/Stats";
// import DomainMap from "./Panels/DomainMap";
import ValidatorList from "./Panels/ValidatorList";
import LastUpdatedInfoBar from "../../components/Common/LastUpdatedInfoBar";

const styles = theme => ({
  main: {
    margin: theme.spacing.unit * 2
  },
  innerContent: {
    maxWidth: 900,
    margin: "0 auto"
  },
  gridItemTop: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2
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
    this.props.onInitValidators();
  }

  render() {
    const { classes, vals } = this.props;

    return (
      <main className={classes.main}>
        {vals.ready ? (
          <React.Fragment>
            <Grid container spacing={0} className={classes.innerContent}>
              <Grid item xs={12} className={classes.gridItemTop}>
                <Filter />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Stats />
              </Grid>
              {/* <Grid item xs={12} className={classes.gridItemBottom}>
                <DomainMap />
              </Grid> */}
              <Grid item xs={12} className={classes.gridItemBottom}>
                <ValidatorList />
              </Grid>
            </Grid>
            <LastUpdatedInfoBar vals={vals} />
            <Tooltip className={classes.tooltip} />
          </React.Fragment>
        ) : (
          <LinearProgress color="secondary" />
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    vals: state.validators
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: () => dispatch(actions.initValidators())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
