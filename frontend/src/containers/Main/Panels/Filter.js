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
import SelectItemButton from "../../../components/Common/SelectItemButton";

import { t, res } from "../../../services/i18nService";

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

const createDefaultUnlOptions = items => {
  return items.map(item => ({
    primaryLabel: item.date,
    secondaryLabel: item.name,
    value: item.id
  }));
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

  handleSelectDefaultUnl = (key, value) => {
    this.props.onDefaultUnlSelected(value);
  };

  handleSelectDefaultUnlDialogOpen = () => {
    const archivesItem = {
      key: "defaultUnl",
      primaryLabel: t(res.LOAD_ANOTHER_DEFAULT_UNL),
      selectedValue: this.props.vals.selectedDefaultUnlId,
      options: createDefaultUnlOptions(this.props.vals.archives)
    };
    this.props.onDefaultUnlSelectOpen(
      t(res.LOAD_ANOTHER_DEFAULT_UNL),
      archivesItem,
      this.handleSelectDefaultUnl
    );
  };

  render() {
    const { classes, vals } = this.props;
    const { defaultOnly, verifiedOnly, mainNetOnly, filterWord } = vals.filter;
    const isDisabled =
      vals.archives && vals.selectedDefaultUnlId !== vals.archives[0].id;

    const footer = (
      <SelectItemButton
        buttonText={t(res.LOAD_ANOTHER_DEFAULT_UNL)}
        onDialogOpen={this.handleSelectDefaultUnlDialogOpen}
      />
    );

    return (
      <ExpandablePanel
        className={classes.panel}
        title={t(res.FILTER)}
        expanded={true}
        footer={footer}
      >
        <div className={classes.wrapper} key="Filter">
          <FormGroup row>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={defaultOnly}
                      disabled={isDisabled}
                      onChange={e =>
                        this.handleApplyFilter("defaultOnly", !defaultOnly)
                      }
                      value="defaultOnly"
                    />
                  }
                  label={t(res.DEFAULT_UNL_ONLY)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={verifiedOnly}
                      disabled={isDisabled}
                      onChange={e =>
                        this.handleApplyFilter("verifiedOnly", !verifiedOnly)
                      }
                      value="verifiedOnly"
                    />
                  }
                  label={t(res.VERIFIED_DOMAINS_ONLY)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mainNetOnly}
                      disabled={isDisabled}
                      onChange={e =>
                        this.handleApplyFilter("mainNetOnly", !mainNetOnly)
                      }
                      value="mainNetOnly"
                    />
                  }
                  label={t(res.MAIN_NET_ONLY)}
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

const mapStateToProps = state => {
  return {
    vals: state.validators,
    ntf: state.notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onApplyFilter: newFilter => dispatch(actions.filterValidators(newFilter)),
    onDefaultUnlSelected: date => dispatch(actions.selectDefaultUnl(date)),
    onDefaultUnlSelectOpen: (title, items, handleSelect) =>
      dispatch(actions.openDialog(title, items, handleSelect)),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, ""))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Filter));
