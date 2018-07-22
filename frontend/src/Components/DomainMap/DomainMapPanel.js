import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "redux-tooltip";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Graticule,
  Markers,
  Marker
} from "react-simple-maps";
import { Motion, spring } from "react-motion";

import MapSelectDomainDialog from "./MapSelectDomainDialog";

const wrapperStyles = {
  width: "100%",
  margin: "0 auto",
  textAlign: "center"
};

const ZOOM_FACTOR = 2;

class SimpleMarkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 20],
      zoom: 1,
      selected: undefined
    };
    this.handleSelectDomain = this.handleSelectDomain.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }
  handleMove(domain, evt) {
    const x = evt.clientX;
    const y = evt.clientY + window.pageYOffset;
    this.props.onShow(x, y, domain.domain);
  }
  handleLeave() {
    this.props.onHide();
  }
  handleSelectDomain(domain) {
    this.setState({
      zoom: ZOOM_FACTOR,
      center: [domain.longitude, domain.latitude],
      selected: domain
    });
  }
  handleReset() {
    this.setState({
      center: [0, 20],
      zoom: 1,
      selected: undefined
    });
  }

  isDomainSelected = domain => {
    return this.state.selected && domain.domain === this.state.selected.domain;
  };

  render() {
    const { classes } = this.props;

    return (
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
              style={{
                width: "100%",
                height: "auto"
              }}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography="/static/world.json">
                  {(geographies, projection) =>
                    geographies.map((geography, i) => (
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
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    ))
                  }
                </Geographies>
                <Graticule />
                <Markers>
                  {this.props.domains.map((domain, i) => (
                    <Marker
                      key={i}
                      marker={{
                        coordinates: [domain.longitude, domain.latitude]
                      }}
                      style={{
                        default: { fill: "#2C3E50", stroke: "#2C3E50" },
                        hover: { fill: "#FFFFFF" },
                        pressed: { fill: "#FF5722" }
                      }}
                      onMouseMove={(item, evt) => this.handleMove(domain, evt)}
                      onMouseLeave={(item, evt) =>
                        this.handleLeave(domain, evt)
                      }
                    >
                      {this.isDomainSelected(domain) && (
                        <circle
                          cx={0}
                          cy={0}
                          r={10}
                          style={{
                            stroke: "#18BC9C",
                            fill: "#18BC9C",
                            strokeWidth: 3,
                            opacity: 0.9
                          }}
                        />
                      )}
                      {this.state.selected &&
                        !this.isDomainSelected(domain) && (
                          <circle
                            cx={0}
                            cy={0}
                            r={6}
                            style={{
                              strokeWidth: 3,
                              opacity: 0.7
                            }}
                          />
                        )}
                      {!this.state.selected && (
                        <circle
                          cx={0}
                          cy={0}
                          r={6}
                          style={{
                            strokeWidth: 3,
                            opacity: 0.8
                          }}
                        />
                      )}
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
        <MapSelectDomainDialog
          domains={this.props.domains}
          handleSelectDomain={this.handleSelectDomain}
          handleReset={this.handleReset}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onMove: showOrHide => dispatch(showOrHide),
    onShow: (x, y, domain) =>
      dispatch(
        actions.show({
          origin: { x, y },
          content: domain
        })
      ),
    onHide: () => dispatch(actions.hide())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SimpleMarkers);
