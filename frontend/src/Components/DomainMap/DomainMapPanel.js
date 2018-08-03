import React from "react";

import { withStyles } from "@material-ui/core/styles";

import MapSelectDomainDialog from "./MapSelectDomainDialog";

const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet;

const styles = theme => ({
  popup: {
    fontSize: "1rem",
    fontFamily: theme.typography.fontFamily
  },
  domain: {
    fontWeight: "bold"
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
  if (domain.region_name) {
    return <span>{`${domain.region_name}, ${domain.country_name}`}</span>;
  }
  if (domain.country_name) {
    return <span>{`${domain.country_name}`}</span>;
  }
  return <span>Unknown location</span>;
};

const getList = (domains, classes) => {
  const elements = [];
  const domainHashMap = {};

  domains.forEach(domain => {
    if (!domainHashMap[domain.domain]) {
      domainHashMap[domain.domain] = 1;
    } else {
      domainHashMap[domain.domain]++;
    }
  });

  Object.keys(domainHashMap).forEach(domainName => {
    const domain = domains.filter(d => d.domain === domainName)[0];
    if (elements.length > 0) {
      elements.push(<br />);
    }
    if (domainHashMap[domainName] > 1) {
      elements.push(
        <span className={classes.domain}>{`${domain.domain} (${domainHashMap[domainName]})`}</span>
      );
    } else {
      elements.push(<span className={classes.domain}>{domain.domain}</span>);
    }
  });

  domains.forEach(domain => {});

  // pospend the region info
  elements.push(<hr />);
  elements.push(getRegionText(domains[0]));

  return elements;
};

class Component extends React.Component {
  state = {
    center: [30, 0],
    zoom: 1,
    selected: undefined
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

  render() {
    const { classes, domains, positions } = this.props;
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
                <Marker position={JSON.parse(position)}>
                  <Popup className={classes.popup}>
                    {getList(positions[position], classes)}
                  </Popup>
                </Marker>
              )
            );
          })}
        </LeafletMap>
        <MapSelectDomainDialog
          domains={domains}
          handleSelectDomain={this.handleSelectDomain}
          handleReset={this.handleReset}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Component);
