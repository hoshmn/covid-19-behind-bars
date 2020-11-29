import React from "react"
import clsx from "clsx"
import { Marker } from "react-simple-maps"
import Spike from "./spike"
import { withStyles } from "@material-ui/core"
import { scaleLinear, scaleOrdinal } from "d3-scale"
import { extent } from "d3-array"

export const styles = {
  highlight: {
    strokeWidth: 2,
  },
  text: {
    textAnchor: "middle",
  },
  spike: {},
}

/**
 * Returns a size value, or a sizer function if a range array is provided
 * @param {string|Array} range
 * @param {*} extent
 * @param {*} selector
 */
const getSizer = (range, extent, selector) => {
  if (typeof range === "number") return range
  if (range.length !== 2)
    throw new Error(
      "SpikeMap size props must be number or array containing min / max (e.g. [0, 16])"
    )
  if (!selector)
    throw new Error("SpikeMap dynamic sizing requires a selector function")
  const scale = scaleLinear().domain([0, 1, extent[1]]).range([0, 0.15, 1])
  return (spike) => scale(selector(spike))
}

// const getSizer = (range, extent, selector) => {
//   if (typeof range === "number") return range
//   if (range.length !== 2)
//     throw new Error(
//       "SpikeMap size props must be number or array containing min / max (e.g. [0, 16])"
//     )
//   if (!selector)
//     throw new Error("SpikeMap dynamic sizing requires a selector function")
//   const scale = scaleSqrt().domain(extent).range(range)
//   return (spike) => scale(selector(spike))
// }

/**
 * Returns a color value, or a color function if an array of values is passed
 * @param {string|Array} values
 * @param {*} groups
 * @param {*} selector
 */
const getColorer = (values, groups, selector) => {
  if (typeof values === "string") return values
  const scale = scaleOrdinal(values).domain(groups)
  return (spike) => scale(selector(spike))
}

/**
 * Helper function to handle "function" and "other" value types
 * @param {*} value
 * @param {*} context
 * @param {*} defaultValue
 */
const getValue = (value, context, defaultValue) => {
  if (typeof value === "function") return value(context)
  if (typeof value === "undefined" || value === null) return defaultValue
  return value
}

const SpikeLayer = ({
  spikes,
  length: lengthValue = 10,
  lengthExtent: overrideLengthExtent,
  color: colorValue = "#666",
  label: labelValue = false,
  stroke: strokeValue = "#666",
  highlight: highlightValue = false,
  width: widthValue = 7,
  widthExtent: overrideWidthExtent,
  groups,
  classes,
  className,
  lengthSelector,
  groupSelector,
  widthSelector,
  children,
  ...props
}) => {
  // spike length calculation
  const lengthExtent = overrideLengthExtent || extent(spikes, lengthSelector)
  const spikeLength = getSizer(lengthValue, lengthExtent, lengthSelector)

  // spike width calculation
  const widthExtent = overrideWidthExtent || extent(spikes, widthSelector)
  const spikeWidth = getSizer(widthValue, widthExtent, widthSelector)

  // create spike fill color function
  const spikeColor = getColorer(colorValue, groups, groupSelector)

  // create spike stroke function
  const spikeStroke = getColorer(strokeValue, groups, groupSelector)

  return (
    <g className={clsx("spike-layer", classes.root, className)} {...props}>
      {spikes.map((spike, i) => {
        const length = getValue(spikeLength, spike)
        const width = getValue(spikeWidth, spike)
        const color = getValue(spikeColor, spike)
        const stroke = getValue(spikeStroke, spike)
        const label = getValue(labelValue, spike)
        const highlight = getValue(highlightValue, spike)
        const coords = spike.coords
        return (
          <Marker
            key={spike.id}
            coordinates={coords}
            className={classes.marker}
          >
            <circle
              r={3.5}
              strokeWidth={1}
              strokeOpacity={length + 0.2}
              stroke={stroke}
              fill={stroke}
              fillOpacity={length}
            ></circle>
            {/* <Spike
              fill={color}
              stroke={stroke}
              length={length}
              width={width}
              className={clsx(classes.spike, {
                [classes.highlight]: highlight,
              })}
            /> */}
            {label && <text className={classes.text}>{label}</text>}
          </Marker>
        )
      })}
      {children}
    </g>
  )
}

SpikeLayer.propTypes = {}

export default withStyles(styles)(SpikeLayer)
