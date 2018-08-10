import React from "react";

import { withStyles } from "@material-ui/core/styles";
import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import Loader from "../../../components/Common/Loader";
import Map from "../../../components/DomainMap/Map";
import DomainSelectButton from "../../../components/DomainMap/DomainSelectButton";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  }
});

class DomainMap extends React.Component {
  state = {
    selectedDomain: undefined
  };

  handleSelectDomain = domain => {
    this.setState({
      selectedDomain: domain
    });
  };

  render() {
    const { classes, vals, app, isLoading } = this.props;
    const { selectedDomain } = this.state;
    let content = <Loader speed={2} height={230} />;
    let footer = <React.Fragment />;

    if (!isLoading && vals.uniqueDomains) {
      content = (
        <Map
          domains={vals.uniqueDomains}
          selectedDomain={selectedDomain}
          positions={vals.positions}
          themeType={app.themeType}
        />
      );
      footer = (
        <DomainSelectButton
          domains={vals.uniqueDomains}
          handleSelect={this.handleSelectDomain}
        />
      );
    }

    return (
      <ExpandablePanel
        className={classes.panel}
        title="Domain Map"
        expanded={false}
        footer={footer}
      >
        <div className={classes.wrapper} key="DomainMap">
          {content}
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DomainMap);
