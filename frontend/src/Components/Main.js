import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IntegrationAutosuggest from "./IntegrationAutosuggest";
import LinearProgress from "@material-ui/core/LinearProgress";
import Hidden from "@material-ui/core/Hidden";
import ExpandablePanel from "./ExpandablePanel";
import ResultStatsPanel from "./ResultStatsPanel";
import InteractiveList from "./InteractiveList";
import Layout from "./Layout";
import SimpleSnackbar from "./SimpleSnackbar";
import Footer from "./Footer";

import Store from "../store";

const store = new Store();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    margin: theme.spacing.unit * 2
  },
  gridItemTop: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 2
  },
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  },
  gridItemBottom: {
    marginBottom: theme.spacing.unit * 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  appBarTitle: {
    fontFamily: theme.titleFontFamily,
    fontSize: "150%",
    width: "100%",
    textAlign: "center"
  },
  nonMobileSpacer: {
    height: theme.spacing.unit * 1
  }
});

const sorter = (a, b) =>
  a.domain && b.domain
    ? a.domain < b.domain
      ? -1
      : a.domain > b.domain
        ? 1
        : 0
    : !a.domain && b.domain
      ? 1
      : a.domain && !b.domain
        ? -1
        : 0;

const filter = (validatorList, state, options) => {
  options = {
    verifiedOnly:
      options.verifiedOnly !== undefined
        ? options.verifiedOnly
        : state.verifiedOnly,
    defaultOnly:
      options.defaultOnly !== undefined
        ? options.defaultOnly
        : state.defaultOnly,
    word: options.word !== undefined ? options.word : state.filterWord,
    unique: options.unique !== undefined ? options.unique : false,
    sort: options.sort !== undefined ? options.sort : state.sort
  };

  const uniqueDomainsHashMap = {};

  const result = validatorList.reduce((prev, curr) => {
    let keep = true;

    // exclude duplicates
    if (keep && options.unique) {
      if (!uniqueDomainsHashMap[curr.domain]) {
        uniqueDomainsHashMap[curr.domain] = {
          count: 1
        };
      } else {
        uniqueDomainsHashMap[curr.domain].count++;
        keep = false;
      }
    }

    // exclude validators whose domain is not verified.
    if (keep && options.verifiedOnly) {
      if (!curr.verified) {
        keep = false;
      }
    }

    // exclude validators that are not in the default UNL.
    if (keep && options.defaultOnly) {
      if (!curr.default) {
        keep = false;
      }
    }

    // filter domain by the word specified
    if (keep && options.word) {
      if (!curr.domain || curr.domain.indexOf(options.word) < 0) {
        keep = false;
      }
    }

    if (keep) {
      prev.push(curr);
    }

    return prev;
  }, []);

  // sort the result in a dictionary order.
  if (options.sort) {
    result.sort(sorter);
  }

  return result;
};

const formatDate = dateStr => {
  return (
    new Date(dateStr).toLocaleDateString() +
    " " +
    new Date(dateStr).toLocaleTimeString()
  );
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  handleDefaultUnlOnlyChange = () => event => {
    this.setState(
      {
        defaultOnly: event.target.checked
      },
      () => {
        this.setState({
          validators: filter(this.state.list, this.state, {}),
          validatorsForFilter: filter(this.state.list, this.state, {
            verifiedOnly: true,
            unique: true,
            sort: true
          })
        });
      }
    );
  };

  handleVerifiedOnlyChange = () => event => {
    this.setState(
      {
        verifiedOnly: event.target.checked
      },
      () => {
        this.setState({
          validators: filter(this.state.list, this.state, {}),
          validatorsForFilter: filter(this.state.list, this.state, {
            verifiedOnly: true,
            unique: true,
            sort: true
          })
        });
      }
    );
  };

  handleSortAlphabeticallyChange = () => event => {
    this.setState(
      {
        sort: event.target.checked
      },
      () => {
        this.setState({
          validators: filter(this.state.list, this.state, {})
        });
      }
    );
  };

  handleDomainFilter = value => {
    this.setState(
      {
        filterWord: value
      },
      () => {
        this.setState({
          validators: filter(this.state.list, this.state, {})
        });
      }
    );
  };

  componentDidMount() {
    const initialState = {
      verifiedOnly: true,
      defaultOnly: true
    };

    store.getValidators(data => {
      this.setState({
        lastUpdated: data.lastUpdated,
        list: data.list,
        validators: filter(data.list, this.state, {
          verifiedOnly: initialState.verifiedOnly,
          defaultOnly: initialState.defaultOnly
        }),
        validatorsForFilter: filter(data.list, this.state, {
          verifiedOnly: true,
          defaultOnly: initialState.defaultOnly,
          unique: true,
          sort: true
        }),
        ready: true,
        verifiedOnly: initialState.verifiedOnly,
        defaultOnly: initialState.defaultOnly,
        sort: false,
        filterWord: ""
      });
    });
  }

  render() {
    const { classes, title } = this.props;
    return (
      <div className={classes.root}>
        {!this.state.ready && <LinearProgress color="secondary" />}
        {this.state.ready && (
          <React.Fragment>
            <AppBar position="absolute" className={classes.appBar}>
              <Toolbar>
                <Layout>
                  <div className={classes.appBarTitle}>{title}</div>
                </Layout>
              </Toolbar>
            </AppBar>
            <Hidden only={["xs"]}>
              <div className={classes.nonMobileSpacer} />
            </Hidden>
            <main className={classes.content}>
              <Layout justify="center">
                <Grid container spacing={0}>
                  <Grid item xs={12} className={classes.gridItemTop}>
                    <ExpandablePanel className={classes.paper} title="Filter">
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <FormGroup row>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.defaultOnly}
                                      onChange={this.handleDefaultUnlOnlyChange()}
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
                                      onChange={this.handleVerifiedOnlyChange()}
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
                                      checked={this.state.sort}
                                      onChange={this.handleSortAlphabeticallyChange()}
                                      value="sort"
                                    />
                                  }
                                  label="Sort Alphabetically"
                                />
                              </Grid>
                            </Grid>
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <IntegrationAutosuggest
                            list={this.state.validatorsForFilter}
                            handleFilterChange={this.handleDomainFilter}
                          />
                        </Grid>
                      </Grid>
                    </ExpandablePanel>
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <ExpandablePanel className={classes.paper} title="Stats">
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <ResultStatsPanel
                            validators={this.state.validators}
                          />
                        </Grid>
                      </Grid>
                    </ExpandablePanel>
                  </Grid>
                  <Grid item xs={12} className={classes.gridItemBottom}>
                    <Paper className={classes.paper}>
                      <InteractiveList list={this.state.validators} />
                    </Paper>
                  </Grid>
                </Grid>
              </Layout>
            </main>
            <Footer />
            <SimpleSnackbar>
              LAST UPDATED: {" " + formatDate(this.state.lastUpdated)}
            </SimpleSnackbar>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
