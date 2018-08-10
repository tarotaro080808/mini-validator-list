import React from "react";

import { withStyles } from "@material-ui/core/styles";

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
  light: {
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  },
  dark: {
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }
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

class Map extends React.Component {
  state = {
    center: [30, 0],
    zoom: 1
  };

  componentWillReceiveProps(props) {
    if (this.props.selectedDomain !== props.selectedDomain) {
      const domain = props.selectedDomain;
      this.setState({
        center: [domain.latitude, domain.longitude],
        zoom: 8
      });
    }
  }

  render() {
    const { classes, positions, selectedDomain, themeType } = this.props;
    const { center, zoom } = this.state;
    return (
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution={TILE_PROVIDER[themeType].attribution}
          url={TILE_PROVIDER[themeType].url}
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
    );
  }
}

export default withStyles(styles)(Map);
