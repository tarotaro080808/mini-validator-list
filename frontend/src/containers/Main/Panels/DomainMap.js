import React from "react";
import ContentLoader from "react-content-loader";

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

const Loader = props => (
  <ContentLoader
    speed={2}
    height={230}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="230" />
  </ContentLoader>
);

class DomainMap extends React.Component {
  render() {
    const { classes, vals, isLoading } = this.props;
    let content = Loader(this.props);

    if (!isLoading && vals.uniqueDomains) {
      content = (
        <DomainMapPanel
          domains={vals.uniqueDomains}
          positions={vals.positions}
        />
      );
    }

    return (
      <ExpandablePanel
        className={classes.panel}
        title="Domain Map"
        expanded={false}
      >
        <div className={classes.wrapper} key="DomainMap">
          {content}
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DomainMap);
