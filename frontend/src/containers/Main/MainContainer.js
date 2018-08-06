import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import withNetworkHandler from "../../util/withNetworkHandler";
import axios from "../../util/axios-api";
import ArchiveMode from "./Panels/ArchiveMode";
import Filter from "./Panels/Filter";
import Stats from "./Panels/Stats";
import DomainMap from "./Panels/DomainMap";
import ValidatorList from "./Panels/ValidatorList";
import LastUpdatedInfoBar from "../../components/Common/LastUpdatedInfoBar";

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
    const { app } = this.props; // old props
    if (props.app.selectedDefaultUnl !== app.selectedDefaultUnl) {
      const date = props.app.selectedDefaultUnl
        ? props.app.selectedDefaultUnl.date
        : undefined;
      const filter = {
        defaultOnly: true,
        verifiedOnly: true,
        mainNetOnly: true,
        filterWord: ""
      };
      this.props.onInitValidators(date, filter);
    }
  }

  render() {
    const { classes, vals, app, isLoading } = this.props;
    const isArchivedMode = app.mode === "ARCHIVE";

    const archivedModePaper = isArchivedMode ? (
      <Grid item xs={12} className={classes.gridItem}>
        <ArchiveMode app={app} />
      </Grid>
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <Grid container spacing={0}>
          {archivedModePaper}
          <Grid item xs={12} className={classes.gridItem}>
            <Filter vals={vals} app={app} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Stats vals={vals} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <DomainMap vals={vals} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ValidatorList vals={vals} isLoading={isLoading} />
          </Grid>
        </Grid>
        <LastUpdatedInfoBar vals={vals} />
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
      dispatch(actions.initValidators(date, filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withNetworkHandler(MainContainer, axios)));
