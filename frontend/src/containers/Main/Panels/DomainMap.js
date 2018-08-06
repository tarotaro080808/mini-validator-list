import React from "react";

import { withStyles } from "@material-ui/core/styles";

import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import DomainMapPanel from "../../../components/DomainMap/DomainMapPanel";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  }
});

class DomainMap extends React.Component {
  render() {
    const { classes, vals, isLoading } = this.props;
    return (
      <ExpandablePanel
        className={classes.panel}
        title="Domain Map"
        expanded={false}
      >
        <div className={classes.wrapper} key="DomainMap">
          {!isLoading && vals.uniqueDomains ? (
            <DomainMapPanel
              domains={vals.uniqueDomains}
              positions={vals.positions}
            />
          ) : (
            <React.Fragment />
          )}
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DomainMap);
