import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.secondary.main
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  map: {
    fill: theme.palette.secondary.main
    // stroke: theme.palette.primary.main
  },
  menuItem: {
    marginBottom: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 1
  }
});

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const formatGeoName = geo => {
  return `${geo.city || "unknown"}, ${geo.country_name}`;
};

const getCz = (r, selectedCity) => {
  const name = `${selectedCity.region_name}, ${selectedCity.country_name}`;
  return r.name === name ? 1 : 0;
};

const getFill = (r, selectedCity) => {
  const name = `${selectedCity.region_name}, ${selectedCity.country_name}`;
  return r.name === name ? "#18BC9C" : "#2C3E50";
};

const getR = (r, selectedCity) => {
  const name = `${selectedCity.region_name}, ${selectedCity.country_name}`;
  return r.name === name ? 15 : 6;
};

const getRegions = validators => {
  const regionMap = {};
  const regions = validators.reduce((prev, curr) => {
    const name = `${curr.region_name}, ${curr.country_name}`;
    if (!regionMap[name]) {
      regionMap[name] = true;
      prev.push({
        name: name,
        coordinates: [curr.longitude, curr.latitude]
      });
    }
    return prev;
  }, []);

  return regions;
};

const reduce = validators => {
  const domainHashMap = {};
  validators = validators.reduce((prev, curr) => {
    if (curr.domain && !domainHashMap[curr.domain] && curr.ip) {
      domainHashMap[curr.domain] = true;
      prev.push(curr);
    }
    return prev;
  }, []);

  return validators;
};

class AnimatedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 20],
      zoom: 1,
      selectedCity: { domain: "None" }
    };
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 4
    });
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 4
    });
  }
  handleCitySelect(e, geo) {
    const domain = e.target.value;
    if (domain !== "None") {
      const loc = geo.filter(g => g.domain === domain)[0];
      this.setState({
        zoom: 4,
        center: [loc.longitude, loc.latitude],
        selectedCity: loc
      });
    } else {
      this.handleReset();
    }
  }
  handleCityClick(city) {
    this.setState({
      zoom: 4,
      center: city.coordinates
    });
  }
  handleReset() {
    this.setState({
      center: [0, 20],
      zoom: 1,
      selectedCity: { domain: "None" }
    });
  }

  render() {
    const { classes, validators } = this.props;

    const geo = reduce(validators);
    const regions = getRegions(validators);

    return (
      validators && (
        <div style={wrapperStyles}>
          <Motion
            defaultStyle={{
              zoom: 1,
              x: 0,
              y: 20
            }}
            style={{
              zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
              x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
              y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
            }}
          >
            {({ zoom, x, y }) => (
              <ComposableMap
                projectionConfig={{ scale: 205 }}
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto"
                }}
              >
                <ZoomableGroup center={[x, y]} zoom={zoom}>
                  <Geographies geography="/static/world-110m.json">
                    {(geographies, projection) =>
                      geographies.map(
                        (geography, i) =>
                          geography.id !== "010" && (
                            <Geography
                              key={i}
                              geography={geography}
                              projection={projection}
                              style={{
                                default: {
                                  fill: "#ECEFF1",
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none"
                                },
                                hover: {
                                  fill: "#18BC9C",
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none"
                                }
                              }}
                            />
                          )
                      )
                    }
                  </Geographies>
                  <Markers>
                    {regions.map((r, i) => (
                      <Marker
                        key={i}
                        marker={{
                          name: r.name,
                          coordinates: r.coordinates
                        }}
                        onClick={this.handleCityClick}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          cz={getCz(r, this.state.selectedCity)}
                          r={getR(r, this.state.selectedCity)}
                          fill={getFill(r, this.state.selectedCity)}
                          stroke={classes.map.stroke}
                        />
                      </Marker>
                    ))}
                  </Markers>
                </ZoomableGroup>
              </ComposableMap>
            )}
          </Motion>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="map-domain-select">Domain</InputLabel>
              <Select
                value={this.state.selectedCity.domain}
                onChange={e => this.handleCitySelect(e, geo)}
                inputProps={{
                  name: "map-domain-select",
                  id: "map-domain-select"
                }}
              >
                {geo.map((g, i) => (
                  <MenuItem
                    key={"menuitem" + i}
                    value={g.domain}
                    className={classes.menuItem}
                  >
                    <Grid item xs={12}>
                      <Grid container spacing={0}>
                        <Hidden only={["sm", "md", "lg", "xl"]}>
                          <Grid item xs={12}>
                            {g.domain}
                          </Grid>
                          <Grid item xs={12}>
                            {formatGeoName(g)}
                          </Grid>
                        </Hidden>
                        <Hidden only={["xs"]}>
                          <Grid item xs={12}>
                            {g.domain + " " + formatGeoName(g)}
                          </Grid>
                        </Hidden>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Button href="#text-buttons" className={classes.button} onClick={(e) => this.handleReset(e)}>
            Reset
          </Button>
        </div>
      )
    );
  }
}

export default withStyles(styles)(AnimatedMap);
