import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import IntegrationAutosuggest from "../../../components/Filter/IntegrationAutosuggest";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit
  },
  buttonXs: {
    marginTop: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const urlbase = "https://minivalist.cinn.app";

const clearFilter = {
  defaultOnly: true,
  verifiedOnly: true,
  mainNetOnly: true,
  filterWord: ""
};

class Filter extends React.Component {
  state = {
    shareUrl: urlbase
  };

  handleApplyFilter = (type, value) => {
    const newFilter = {
      ...this.props.vals.filter,
      [type]: value
    };
    this.props.onApplyFilter(newFilter);
  };

  handleClear() {
    this.setState(
      {
        ...clearFilter,
        shareUrl: urlbase
      },
      () => {
        this.props.onApplyFilter(clearFilter);
      }
    );
  }

  render() {
    const { classes, vals, app } = this.props;
    const { defaultOnly, verifiedOnly, mainNetOnly, filterWord } = vals.filter;
    const isArchiveMode = app.mode === "ARCHIVE";

    return (
      <ExpandablePanel className={classes.panel} title="Filter" expanded={true}>
        <div className={classes.wrapper} key="Filter">
          <FormGroup row>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={defaultOnly}
                      disabled={isArchiveMode}
                      onChange={e =>
                        this.handleApplyFilter("defaultOnly", !defaultOnly)
                      }
                      value="defaultOnly"
                    />
                  }
                  label="Default UNL Only"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={verifiedOnly}
                      disabled={isArchiveMode}
                      onChange={e =>
                        this.handleApplyFilter("verifiedOnly", !verifiedOnly)
                      }
                      value="verifiedOnly"
                    />
                  }
                  label="Verified Domains Only"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mainNetOnly}
                      disabled={isArchiveMode}
                      onChange={e =>
                        this.handleApplyFilter("mainNetOnly", !mainNetOnly)
                      }
                      value="mainNetOnly"
                    />
                  }
                  label="Main Net Only"
                />
              </Grid>
              <Grid item xs={12}>
                <IntegrationAutosuggest
                  list={vals.filteredValidatorsForAutosuggest}
                  value={filterWord}
                  handleFilterChange={value =>
                    this.handleApplyFilter("filterWord", value)
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </div>
      </ExpandablePanel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onApplyFilter: newFilter => dispatch(actions.filterValidators(newFilter))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Filter));
