import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import XRPTipBotButton from "../Common/XRPTipBotButton";

const styles = theme => ({
  icon: {
    fontSize: "110%"
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

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <div className={classes.innerWrapper}>
        <XRPTipBotButton
          network="twitter"
          to="CinnappleFun"
          size={225}
          amount={0.2}
        />
        <IconButton
          aria-label="Twitter"
          component="a"
          href={"https://twitter.com/CinnappleFun"}
        >
          <Icon className={classNames("fab fa-twitter-square")} />
        </IconButton>
        <IconButton
          aria-label="GitHub"
          component="a"
          href={"https://github.com/cinnapple/mini-validator-list"}
        >
          <Icon className={classNames("fab fa-github-square")} />
        </IconButton>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
