import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";

import { t, res } from "../../services/i18nService";
import { links } from "../../menu";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";

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
    paddingLeft: theme.spacing.unit * 10
  },
  bottom: {
    position: "absolute",
    width: "100%",
    bottom: 0
  }
});

class NavigationItems extends React.Component {
  state = { externalLinkOpen: true };
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
          {links.map((link, index) => (
            <React.Fragment key={`nav-${index}`}>
              <Divider />
              <ListItem
                button
                component={link.path.startsWith("http") ? "a" : Link}
                to={link.path}
                href={link.path.startsWith("http") ? link.path : undefined}
                target={link.path.startsWith("http") ? "_blank" : undefined}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <Icon
                    className={classNames(link.icon)}
                    color={
                      location.pathname === link.path ? "secondary" : undefined
                    }
                  />
                </ListItemIcon>
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
          <Divider />
          <List
            component="div"
            disablePadding
            className={classes.bottom}
            subheader={
              <ListSubheader component="div">
                {t(res.MENU_GET_IN_TOUCH)}
              </ListSubheader>
            }
          >
            <Divider />
            <ListItem
              button
              component="a"
              href="https://twitter.com/CinnappleFun"
              target="_blank"
            >
              <ListItemIcon>
                <Icon className={classNames("fab fa-twitter")} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>@CinnappleFun</Typography>}
              />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://github.com/cinnapple/mini-validator-list"
              target="_blank"
            >
              <ListItemIcon>
                <Icon className={classNames("fab fa-github")} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>Source</Typography>}
              />
            </ListItem>
            <Divider />
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
