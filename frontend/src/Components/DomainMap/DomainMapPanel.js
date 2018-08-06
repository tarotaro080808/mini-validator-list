import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FullScreenSelect from "../Common/FullScreenSelect";

const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet;

const styles = theme => ({
  popup: {
    fontSize: "1rem",
    fontFamily: theme.typography.fontFamily
  },
  domain: {
    fontWeight: "bold"
  },
  select: {
    marginTop: "1rem"
  }
});

// refer: https://leaflet-extras.github.io/leaflet-providers/preview/index.html
const TILE_PROVIDER = {
  url:
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
};

const getRegionText = domain => {
  let text = "Unknown location";
  if (domain.region_name) {
    text = `${domain.region_name}, ${domain.country_name}`;
  }
  if (domain.country_name) {
    text = `${domain.country_name}`;
  }
  return <span key={text}>{text}</span>;
};

const formatDomainName = domain => {
  const region =
    (domain.city ? domain.city + " " : "") +
    (domain.region_name ? domain.region_name + " " : "");
  const country = domain.country_name ? domain.country_name : "";
  const fullName = (region ? region + ", " : "") + country;
  return fullName || "Unknown";
};

const getList = (domains, position, classes) => {
  const elements = [];
  const domainHashMap = {};

  domains.forEach(domain => {
    if (!domainHashMap[domain.domain]) {
      domainHashMap[domain.domain] = 1;
    } else {
      domainHashMap[domain.domain]++;
    }
  });

  Object.keys(domainHashMap).forEach((domainName, index) => {
    const key = `${position}-${index}`;
    const domain = domains.filter(d => d.domain === domainName)[0];

    let text = "";
    if (domainHashMap[domainName] > 1) {
      text = `${domain.domain} (${domainHashMap[domainName]})`;
    } else {
      text = domain.domain;
    }

    if (elements.length > 0) {
      elements.push(<br key={`br-${key}`} />);
    }
    elements.push(
      <span key={`span-${key}`} className={classes.domain}>
        {text}
      </span>
    );
  });

  // pospend the region info
  elements.push(<hr key={position} />);
  elements.push(getRegionText(domains[0]));

  return <div key={position}>{elements}</div>;
};

class DomainMapPanel extends React.Component {
  state = {
    center: [30, 0],
    zoom: 1,
    selected: undefined,
    domainSelectOpen: false
  };

  isDomainSelected = domain => {
    return this.state.selected && domain.domain === this.state.selected.domain;
  };

  handleSelectDomain = domain => {
    this.setState({
      center: [domain.latitude, domain.longitude],
      zoom: 8,
      selected: undefined
    });
  };

  handleOpenDomainSelect = () => {
    this.setState({
      domainSelectOpen: true
    });
  };

  handleCloseDomainSelect = () => {
    this.setState({
      domainSelectOpen: false
    });
  };

  render() {
    const { classes, domains, positions } = this.props;
    const { domainSelectOpen } = this.state;
    return (
      <React.Fragment>
        <LeafletMap center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            attribution={TILE_PROVIDER.attribution}
            url={TILE_PROVIDER.url}
          />
          {Object.keys(positions).map((position, i) => {
            return (
              JSON.parse(position)[0] !== null && (
                <Marker key={position} position={JSON.parse(position)}>
                  <Popup className={classes.popup}>
                    {getList(positions[position], position, classes)}
                  </Popup>
                </Marker>
              )
            );
          })}
        </LeafletMap>
        <div className={classes.select}>
          <Button
            variant="outlined"
            size="small"
            onClick={this.handleOpenDomainSelect}
            style={{
              width: "100%",
              backgroundColor: "#eee"
            }}
          >
            Locate Domain
          </Button>
          <FullScreenSelect
            list={domains}
            selectTitle="Select Domain"
            open={domainSelectOpen}
            getListItemPrimaryText={domain => domain.domain}
            getListItemSecondaryText={domain => formatDomainName(domain)}
            handleClose={this.handleCloseDomainSelect}
            handleSelectItem={this.handleSelectDomain}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DomainMapPanel);
