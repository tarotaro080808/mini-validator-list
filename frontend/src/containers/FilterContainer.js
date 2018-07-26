import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import ExpandablePanel from "../components/Common/ExpandablePanel";
import IntegrationAutosuggest from "../components/Filter/IntegrationAutosuggest";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  }
});

class Component extends React.Component {
  state = {
    defaultOnly: true,
    verifiedOnly: false,
    mainNetOnly: true,
    filterWord: ""
  };

  handleApplyFilter = (type, value) => {
    this.setState(
      {
        [type]: value
      },
      () => {
        this.props.onApplyFilter(this.state);
      }
    );
  };

  componentDidMount() {
    this.props.onApplyFilter(this.state);
  }

  render() {
    return (
      <ExpandablePanel
        className={this.props.classes.panel}
        title="Filter"
        expanded={true}
      >
        <div className={this.props.classes.wrapper}>
          <FormGroup row>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.defaultOnly}
                      onChange={e =>
                        this.handleApplyFilter(
                          "defaultOnly",
                          !this.state.defaultOnly
                        )
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
                      checked={this.state.verifiedOnly}
                      onChange={e =>
                        this.handleApplyFilter(
                          "verifiedOnly",
                          !this.state.verifiedOnly
                        )
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
                      checked={this.state.mainNetOnly}
                      onChange={e =>
                        this.handleApplyFilter(
                          "mainNetOnly",
                          !this.state.mainNetOnly
                        )
                      }
                      value="mainNetOnly"
                    />
                  }
                  label="Main Net Only"
                />
              </Grid>
              <Grid item xs={12}>
                <IntegrationAutosuggest
                  list={this.props.vals.filteredValidatorsForAutosuggest}
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

const mapStateToProps = state => {
  return {
    vals: state.validators
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onApplyFilter: filter => dispatch(actions.filterValidators(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Component));
