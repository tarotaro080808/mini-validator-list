import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {},
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

const getIconClassName = domain => {
  if (domain.indexOf("xrpchat.com") >= 0) {
    return "fas fa-comments";
  }
  if (domain.indexOf("reddit.com") >= 0) {
    return "fab fa-reddit-alien";
  }
  if (domain.indexOf("twitter.com") >= 0) {
    return "fab fa-twitter";
  }
  return "far fa-star";
};

const isWellKnown = domain => getIconClassName(domain) !== "far fa-star";

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: {} };
    this.props.list.forEach((list, index) => {
      this.state.open[index] = true;
    });
  }

  handleClick = title => {
    const currentState = !!this.state.open[title];
    const open = {
      ...this.state.open,
      [title]: !currentState
    };
    this.setState(state => ({ open: open }));
  };

  render() {
    const { classes, title, list } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">{title}</ListSubheader>}
        >
          {list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <List disablePadding>
                  <Divider />
                  <a
                    href={item.url}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem key={index} button className={classes.nested}>
                      <ListItemIcon>
                        <Chip
                          label={
                            <Icon
                              className={classNames(
                                getIconClassName(item.domain)
                              )}
                              color="primary"
                            />
                          }
                          className={classes.chip}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          `${item.title}` +
                          (!isWellKnown(item.domain) ? ` [${item.domain}]` : "")
                        }
                      />
                    </ListItem>
                  </a>
                </List>
              </React.Fragment>
            );
          })}
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);
