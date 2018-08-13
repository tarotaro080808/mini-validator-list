import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import axios from "../../util/axios-api";
import Filter from "./Panels/Filter";
import Stats from "./Panels/Stats";
import DomainMap from "./Panels/DomainMap";
import ValidatorList from "./Panels/ValidatorList";

const styles = theme => ({
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  }
});

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.onInitValidators();
  }

  componentWillReceiveProps(props) {
    if (this.props.vals.selectedDefaultUnlId) {
      if (
        this.props.vals.selectedDefaultUnlId !== props.vals.selectedDefaultUnlId
      ) {
        const date = props.vals.selectedDefaultUnlId;
        const filter = {
          defaultOnly: true,
          verifiedOnly: true,
          mainNetOnly: true,
          filterWord: ""
        };
        this.props.onInitValidators(date, filter);
      }
    }
  }

  render() {
    const { classes, vals, app, isLoading } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.gridItem}>
            <Filter vals={vals} app={app} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Stats vals={vals} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <DomainMap vals={vals} app={app} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ValidatorList vals={vals} isLoading={isLoading} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    vals: state.validators,
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: (date, filter) =>
      dispatch(actions.initValidators(date, filter)),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, ""))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withNetworkHandler(MainContainer, axios)));
