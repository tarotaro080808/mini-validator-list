import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ExpandablePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded
    };
  }

  handleChange = panel => () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { classes, title, children, footer } = this.props;
    const { expanded } = this.state;

    const details = [
      <ExpansionPanelDetails key={`${title}-expandablepaneldetails`}>
        {children}
      </ExpansionPanelDetails>
    ];
    if (footer) {
      details.push(<Divider key={`${title}-expandablepaneldetails-divider`} />);
      details.push(
        <ExpansionPanelDetails
          key={`${title}-expandablepaneldetails-footer`}
          style={{ paddingBottom: "0.5rem" }}
        >
          {footer}
        </ExpansionPanelDetails>
      );
    }

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded} onChange={this.handleChange()}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>
          {details}
        </ExpansionPanel>
      </div>
    );
  }
}

ExpandablePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpandablePanel);
