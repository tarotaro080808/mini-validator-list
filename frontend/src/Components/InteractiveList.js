import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  domainLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  unverifiedDomain: {
    color: theme.palette.text.secondary
  },
  pubkeyLink: {
    textDecorationStyle: "dotted",
    color: theme.palette.text.secondary
  },
  index: {
    width: "1.5rem"
  },
  icon: {
    width: "1.5rem"
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

const defaultUnlIcon = (
  <i className="fas fa-award" style={{ color: "rgb(255, 152, 0)" }} />
);

const verifiedIcon = (
  <i className="fas fa-check" style={{ color: "rgb(76, 175, 80)" }} />
);

const truncWithDots = (str, num) => {
  return str.slice(0, num) + (str.length > num ? "..." : "");
};

const linkToDomain = (domain, truncate, classes) => (
  <a href={"https://" + domain} target="_blank" className={classes.domainLink}>
    {truncate ? truncWithDots(domain, 31) : domain}
  </a>
);

const unverifiedDomain = (pubkey, truncate, classes) => (
  <span className={classes.unverifiedDomain}>{"unverified *"}</span>
);

const linkToValidator = (pubkey, truncate, classes) => (
  <a
    className={classes.pubkeyLink}
    href={"https://xrpcharts.ripple.com/#/validators/" + pubkey}
    target="_blank"
  >
    {truncate ? truncWithDots(pubkey, 30) : pubkey}
  </a>
);

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false
  };

  render() {
    const { classes, list } = this.props;
    const { secondary } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event, checked) =>
                  this.setState({ secondary: checked })
                }
                value="secondary"
              />
            }
            label="Show Validation Public Key"
          />
        </FormGroup>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <List dense>
              {list.map((v, index) => (
                <div key={index}>
                  <ListItem>
                    <Hidden only={["xs"]}>
                      <Typography align="right" className={classes.index}>
                        {index + 1}
                      </Typography>
                      <Typography align="right" className={classes.icon}>
                        {v.default && defaultUnlIcon}
                        {!v.default && v.verified && verifiedIcon}
                      </Typography>
                    </Hidden>
                    <ListItemText
                      primary={
                        <span>
                          <Hidden only={["xs"]}>
                            {v.domain
                              ? linkToDomain(v.domain, false, classes)
                              : unverifiedDomain(v.pubkey, false, classes)}
                          </Hidden>
                          <Hidden only={["sm", "md", "lg", "xl"]}>
                            {v.domain
                              ? linkToDomain(v.domain, true, classes)
                              : unverifiedDomain(v.pubkey, true, classes)}
                          </Hidden>
                        </span>
                      }
                      secondary={
                        secondary ? (
                          <code>
                            <Hidden only={["xs"]}>
                              {linkToValidator(v.pubkey, false, classes)}
                            </Hidden>
                            <Hidden only={["sm", "md", "lg", "xl"]}>
                              {linkToValidator(v.pubkey, true, classes)}
                            </Hidden>
                          </code>
                        ) : null
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InteractiveList);
