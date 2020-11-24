import React from "react"
import { useDataSelector, useHoveredFacilities } from "../../../common/hooks"
import { getTopValues } from "../../../common/utils"
import { useSpikeStyles } from "../styles"
import FacilitiesSpikeLayer from "./facilities-spike-layer"

const FacilitiesSpikeHighlight = (props) => {
  const classes = useSpikeStyles()
  const dataSelector = useDataSelector()
  const activeData = useHoveredFacilities()
  const top = getTopValues(activeData, dataSelector)
  return (
    <FacilitiesSpikeLayer
      style={{ pointerEvents: "none" }}
      spikes={top}
      classes={{ spike: classes.spikeHighlight }}
      {...props}
    />
  )
}

export default FacilitiesSpikeHighlight
