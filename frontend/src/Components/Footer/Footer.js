import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import XRPTipBotButton from "../Common/XRPTipBotButton";

const styles = theme => ({
  linkText: {
    color: theme.palette.primary.main
  },
  linkIcon: {
    color: theme.palette.primary.main
  },
  footer: {
    width: "100%",
    marginBottom: "1rem"
  },
  innerWrapper: {
    width: "100%",
    textAlign: "center"
  }
});

const githubLink = classes => (
  <a
    className={classes.linkIcon}
    href="https://github.com/cinnapple/mini-validator-list"
    target="_blank"
  >
    GitHub
  </a>
);

const twitterLink = classes => (
  <a
    className={classes.linkIcon}
    href="https://twitter.com/CinnappleFun"
    target="_blank"
  >
    Twitter
  </a>
);

const siteLink = classes => (
  <a className={classes.linkText} href="https://cinnapple.fun" target="_blank">
    Cinnapple
  </a>
);

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <div className={classes.innerWrapper}>
        <div>
          <XRPTipBotButton network="twitter" to="CinnappleFun" amount={0.2} />
        </div>
        <Typography
          gutterBottom
          color="inherit"
          align="center"
          noWrap
          variant="caption"
        >
          {siteLink(classes)} | {twitterLink(classes)} | {githubLink(classes)}
        </Typography>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
