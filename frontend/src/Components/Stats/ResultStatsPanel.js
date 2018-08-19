import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import SimpleCard from "../Common/SimpleCard";

const styles = theme => ({});

class ResultStatsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, statsList } = this.props;
    return (
      <Grid container spacing={16}>
        {statsList.map((statsItem, index) => (
          <Grid
            key={`resultstatspanel-${index}`}
            item
            xs={statsItem.size.xs}
            sm={statsItem.size.sm}
          >
            <SimpleCard
              value={statsItem.value}
              description={statsItem.description}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ResultStatsPanel);
