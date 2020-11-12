import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Marker } from "react-simple-maps"
import Spike from "./spike"
import { withStyles } from "@material-ui/core"

export const styles = {
  highlight: {
    strokeWidth: 2,
  },
  text: {
    textAnchor: "middle",
  },
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
  color: colorValue = "#666",
  label: labelValue = false,
  stroke: strokeValue = "#666",
  highlight: highlightValue = false,
  width: widthValue = 7,
  classes,
  className,
  children,
  ...props
}) => {
  return (
    <g className={clsx("spike-layer", classes.root, className)}>
      {spikes.map((spike, i) => {
        const length = getValue(lengthValue, spike)
        const width = getValue(widthValue, spike)
        const color = getValue(colorValue, spike)
        const stroke = getValue(strokeValue, spike)
        const label = getValue(labelValue, spike)
        const highlight = getValue(highlightValue, spike)
        const coords = spike.coords
        try {
          const component = (
            <Marker
              key={spike.id}
              coordinates={coords}
              className={classes.marker}
            >
              <Spike
                fill={color}
                stroke={stroke}
                length={length}
                width={width}
                className={clsx(classes.spike, {
                  [classes.highlight]: highlight,
                })}
              />
              {label && <text className={classes.text}>{label}</text>}
            </Marker>
          )
          return component
        } catch (err) {
          console.log(err)
          debugger
        }
      })}
      {children}
    </g>
  )
}

SpikeLayer.propTypes = {}

export default withStyles(styles)(SpikeLayer)
