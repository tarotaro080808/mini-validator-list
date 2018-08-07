import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import MessageSnackbar from "../../components/Common/MessageSnackbar";

const styles = theme => ({});

class NotificationContainer extends React.Component {
  render() {
    const { ntf } = this.props;
    const { variant, message } = ntf;

    return <MessageSnackbar variant={variant}>{message}</MessageSnackbar>;
  }
}

const mapStateToProps = state => {
  return {
    ntf: state.notification
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(NotificationContainer));
