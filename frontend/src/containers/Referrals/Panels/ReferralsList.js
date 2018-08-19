import React from "react";
import connect from "react-redux/es/connect/connect";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

import ReferralsList from "../../../components/ReferralsList/ReferralsList";

const styles = theme => ({
  wrapper: {
    width: "100%"
  }
});

class Component extends React.Component {
  render() {
    const { an, classes } = this.props;
    return an.referres ? (
      <div className={classes.wrapper}>
        <Paper>
          <ReferralsList title="Referrals" list={an.referres} />
        </Paper>
      </div>
    ) : (
      <React.Fragment />
    );
  }
}

const mapStateToProps = state => {
  return {
    an: state.analytics
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Component)
);
