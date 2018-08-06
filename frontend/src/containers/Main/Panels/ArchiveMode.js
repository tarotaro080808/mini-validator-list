import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  wrapper: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main
  },
  text: {
    color: theme.palette.primary.contrastText
  },
  link: {
    color: theme.palette.primary.contrastText
  }
});

class ArchiveMode extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
      <div className={classes.wrapper} key="ArchiveMode">
        <Paper className={classes.paper} elevation={1}>
          <Typography component="p" className={classes.text}>
            <i className="fas fa-exclamation-triangle" />&nbsp; You're viewing
            the data as of {app.selectedDefaultUnl.date}. The archived
            file can be found{" "}
            <a href={app.selectedDefaultUnl.url} target="_blank" className={classes.link}>
              HERE
            </a>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ArchiveMode);
