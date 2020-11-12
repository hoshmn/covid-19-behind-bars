import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { navigate } from "gatsby"
import useFacilitiesData from "../../utils/use-facilities-data"
import SpikeMap from "../spike-map/spike-map"
import useOptionsStore from "./use-options-store"
import MetricToggle from "./metric-toggle"
import MapLegend from "./legend"
import shallow from "zustand/shallow"
const styles = {
  shape: {
    fill: "#F5F5ED",
    stroke: "#DDDDCB",
  },
  text: {
    fill: "#67675B",
  },
  hover: {
    strokeWidth: 2,
    stroke: "#67675B",
  },
}
const StyledSpikeMap = withStyles(styles)(SpikeMap)

/**
 * Gradient definitions for map
 */
const SpikeGradients = ({ colors, topOpacity = 0.9, bottomOpacity = 0 }) => (
  <defs>
    {colors.map((c, i) => (
      <linearGradient
        key={"g" + i}
        id={"g" + (i + 1)}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: c, stopOpacity: topOpacity }} />
        <stop
          offset="100%"
          style={{ stopColor: c, stopOpacity: bottomOpacity }}
        />
      </linearGradient>
    ))}
  </defs>
)

const HomeMap = ({ ...props }) => {
  const [
    metric,
    categories,
    selectedCategories,
    categoryColors,
  ] = useOptionsStore(
    (state) => [
      state.metric,
      state.categories,
      state.selectedCategories,
      state.categoryColors,
    ],
    shallow
  )
  const { nodes } = useFacilitiesData()

  // selector for facility type
  const typeSelector = (d) => d.Facility
  // selector for data value
  const dataSelector = (d) => d.Residents[metric]
  // selectory for secondary data value
  const widthSelector = (d) => d.PopulationCount

  // filter out points not in categories provided
  // or that are missing lat / lon
  const spikes = nodes.filter(
    (d) =>
      selectedCategories.indexOf(typeSelector(d)) > -1 &&
      !isNaN(d.coords[0]) &&
      !isNaN(d.coords[1])
  )
  // .slice(0, 10)

  // handler for selection
  const handleSelect = (geo) => {
    navigate(`states/${geo.properties.name.toLowerCase()}`)
  }

  // colors for strokes and gradients
  const colors = categoryColors

  return (
    <div style={{ position: "relative" }}>
      <StyledSpikeMap
        interactive
        showLabels
        spikes={spikes}
        categories={categories}
        lengths={[0, 200]}
        widths={7}
        fills={["url(#g1)", "url(#g2)", "url(#g3)"]}
        strokes={colors}
        categorySelector={typeSelector}
        lengthSelector={dataSelector}
        widthSelector={widthSelector}
        onSelect={handleSelect}
      >
        <SpikeGradients colors={colors} />
      </StyledSpikeMap>
      <div
        style={{
          position: "absolute",
          top: -24,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <MetricToggle />
        <MapLegend />
      </div>
    </div>
  )
}

HomeMap.propTypes = {}

export default HomeMap
