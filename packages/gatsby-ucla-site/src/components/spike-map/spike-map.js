import React from "react"
import PropTypes from "prop-types"
import { StateMap } from "@hyperobjekt/svg-maps"
import SpikeLayer from "./spike-layer"
import { scaleLinear, scaleOrdinal } from "d3-scale"
import { extent } from "d3-array"

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
  const scale = scaleLinear().domain(extent).range(range)
  return (spike) => scale(selector(spike))
}

/**
 * Returns a color value, or a color function if an array of values is passed
 * @param {string|Array} values
 * @param {*} categories
 * @param {*} selector
 */
const getColorer = (values, categories, selector) => {
  if (typeof values === "string") return values
  const scale = scaleOrdinal(values).domain(categories)
  return (spike) => scale(selector(spike))
}

const SpikeMap = ({
  spikes,
  lengths = [0, 200],
  spikeExtent: overrideSpikeExtent,
  widths = 7,
  widthExtent: overrideWidthExtent,
  fills = ["url(#grad1)", "url(#grad2)", "url(#grad3)"],
  strokes = ["#CA7F26", "#6BA084", "#758EAC"],
  categories,
  lengthSelector,
  categorySelector,
  widthSelector,
  children,
  ...props
}) => {
  // spike length calculation
  const spikeExtent = overrideSpikeExtent || extent(spikes, lengthSelector)
  const spikeLength = getSizer(lengths, spikeExtent, lengthSelector)

  // spike width calculation
  const widthExtent = overrideWidthExtent || extent(spikes, widthSelector)
  const spikeWidth = getSizer(widths, widthExtent, widthSelector)

  // create spike fill color function
  const spikeColor = getColorer(fills, categories, categorySelector)

  // create spike stroke function
  const spikeStroke = getColorer(strokes, categories, categorySelector)

  return (
    <StateMap {...props}>
      {children}
      <SpikeLayer
        spikes={spikes}
        length={spikeLength}
        width={spikeWidth}
        color={spikeColor}
        stroke={spikeStroke}
      />
    </StateMap>
  )
}

export default SpikeMap
