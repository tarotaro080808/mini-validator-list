import React from "react";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import ResultStatsPanel from "../../../components/Stats/ResultStatsPanel";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  },
  circle: {
    color:
      theme.palette.primary[
        theme.palette.type === "dark" ? "contrastText" : "main"
      ]
  }
});

const createCircle = classes => (
  <CircularProgress size={23} thickness={4} className={classes.circle} />
);

class Stats extends React.Component {
  render() {
    const { classes, vals, isLoading } = this.props;
    const statsList = [];
    const size = {
      xs: 6,
      sm: 3
    };

    statsList.push({
      description: "validators",
      value: createCircle(classes),
      size
    });
    statsList.push({
      description: "in default UNL",
      value: createCircle(classes),
      size
    });
    statsList.push({
      description: "ripple.com",
      value: createCircle(classes),
      size
    });
    statsList.push({
      description: "dominance",
      value: createCircle(classes),
      size
    });

    if (!isLoading && vals.stats) {
      statsList[0].value = vals.stats.total;
      statsList[1].value = vals.stats.default;
      statsList[2].value = vals.stats.runByRipple;
      statsList[3].value = Math.round(vals.stats.dominance * 100) + "%";
    }

    return (
      <ExpandablePanel className={classes.panel} title="Stats" expanded={true}>
        <div className={classes.wrapper} key="Stats">
          <ResultStatsPanel statsList={statsList} />
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Stats);
