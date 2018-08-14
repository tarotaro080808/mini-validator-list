import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

import { t, res } from "../../services/i18nService";
import { links } from "../../menu";

import List from "@material-ui/core/List";
import XRPTipBotButton from "../Common/XRPTipBotButton";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    fontFamily: "Pacifico, sans-serif",
    fontSize: "130%"
  },
  link: {
    fontWeight: "bold"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  bottom: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: theme.spacing.unit * 5
  }
});

class NavigationItems extends React.Component {
  state = { externalLinkOpen: false };
  handleClick = () => {
    this.setState(state => ({ externalLinkOpen: !state.externalLinkOpen }));
  };
  render() {
    const { classes, handleDrawerToggle } = this.props;

    return (
      <React.Fragment>
        <div>
          <ListItem className={classes.toolbar}>
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.title}>
                  Mini Validator List
                </Typography>
              }
            />
          </ListItem>
          <Divider />
          {links.map((link, index) => (
            <React.Fragment key={`nav-${index}`}>
              <ListItem
                button
                component={link.path.startsWith("http") ? "a" : Link}
                to={link.path}
                href={link.path.startsWith("http") ? link.path : undefined}
                target={link.path.startsWith("http") ? "_blank" : undefined}
                onClick={handleDrawerToggle}
              >
                {location.pathname === link.path ? (
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography className={classes.link} color={"secondary"}>
                        {t(link.res)}
                      </Typography>
                    }
                  />
                ) : (
                  <ListItemText
                    disableTypography
                    primary={<Typography>{t(link.res)}</Typography>}
                  />
                )}
              </ListItem>
            </React.Fragment>
          ))}
          <ListItem button onClick={this.handleClick}>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  className={this.state.externalLinkOpen ? classes.link : ""}
                >
                  {t(res.MENU_GET_IN_TOUCH)}
                </Typography>
              }
            />
          </ListItem>
          <Collapse
            in={this.state.externalLinkOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                className={classes.nested}
                button
                component="a"
                href="https://twitter.com/CinnappleFun"
                target="_blank"
              >
                <ListItemText
                  disableTypography
                  primary={<Typography>@CinnappleFun</Typography>}
                />
              </ListItem>
              <ListItem
                className={classes.nested}
                button
                component="a"
                href="https://github.com/cinnapple/mini-validator-list"
                target="_blank"
              >
                <ListItemText
                  disableTypography
                  primary={<Typography>Source</Typography>}
                />
              </ListItem>
            </List>
          </Collapse>
          <List component="div" disablePadding className={classes.bottom}>
            <ListItem>
              <ListItemText
                primary={
                  <XRPTipBotButton
                    network="twitter"
                    to="CinnappleFun"
                    size={215}
                    amount={0.2}
                  />
                }
              />
            </ListItem>
          </List>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NavigationItems);
