import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ExpandablePanel extends React.Component {
  state = {
    expanded: true,
  };

  handleChange = panel => () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { classes, title, children } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded} onChange={this.handleChange()}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ExpandablePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpandablePanel);