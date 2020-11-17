import React, { memo, useCallback } from "react"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import { navigate } from "gatsby"
import {
  SvgMap,
  HoverShape,
  StateLayer,
  useMapStore,
} from "@hyperobjekt/svg-maps"
import { color } from "d3-color"
import HomeMapSpikeHighlight from "./home-map-spike-highlight"
import HomeMapGradients from "./home-map-gradients"
import HomeMapSpikeLayer from "./home-map-spike-layer"
const styles = (theme) => ({
  hovered: {},
  stateLayer: {},
  spikeLayer: {
    pointerEvents: "none",
    opacity: 1,
  },
  spikeLayerHovered: {
    opacity: 0.8,
  },
  stateShape: {
    fill: "#F5F5ED",
    stroke: "#DDDDCB",
  },
  stateLabel: {
    fill: theme.palette.text.secondary,
    fillOpacity: 0.5,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(10),
  },
  hoverShape: {
    strokeOpacity: 1,
    strokeWidth: 2,
    stroke: color("#DDDDCB").darker(0.4).formatHex(),
    fill: "transparent",
  },
  highlightRoot: {
    pointerEvents: "none",
  },
  highlightSpike: {
    stroke: "rgba(255,0,0,0.5)",
    fill: "rgba(255,0,0,0.1)",
    strokeWidth: 1.5,
  },
})

// handler for selection
const handleSelect = (geo) => {
  navigate(`states/${geo.properties.name.toLowerCase()}`)
}

const HomeMap = memo(({ classes, className, children, ...props }) => {
  // const isHovered = useMapStore((state) => Boolean(state.hovered))
  // changing layer styles on hover is disabled for now, too bad for perf
  const isHovered = false
  return (
    <SvgMap
      projection="geoAlbersUsa"
      className={clsx({ "svg-map--hovered": isHovered })}
      {...props}
    >
      <HomeMapGradients />
      <StateLayer
        className={classes.stateLayer}
        classes={{
          shape: classes.stateShape,
          text: classes.stateLabel,
        }}
        onSelect={handleSelect}
        showLabels
        interactive
      />
      <HoverShape className={classes.hoverShape} />
      <HomeMapSpikeLayer
        className={clsx(classes.spikeLayer, {
          [classes.spikeLayerHovered]: isHovered,
        })}
      />
      <HomeMapSpikeHighlight
        className={classes.highlightRoot}
        classes={{ spike: classes.highlightSpike }}
      />
    </SvgMap>
  )
})

HomeMap.propTypes = {}

export default withStyles(styles)(HomeMap)
