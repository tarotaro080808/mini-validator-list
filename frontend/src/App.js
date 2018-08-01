import React from "react";

import { withStyles } from "@material-ui/core/styles";

import withRoot from "./components/Common/withRoot";
import Header from "./components/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./components/Footer/Footer";

const APP_TITLE = "Mini Validator List";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header title={APP_TITLE} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Component));
