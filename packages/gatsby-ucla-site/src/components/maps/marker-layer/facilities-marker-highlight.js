import React from "react"
import { useDataSelector, useHoveredFacilities } from "../../../common/hooks"
import { getTopValues } from "../../../common/utils"
import { useSpikeStyles } from "../styles"
import FacilitiesMarkerLayer from "./facilities-marker-layer"

const FacilitiesSpikeHighlight = (props) => {
  const classes = useSpikeStyles()
  const dataSelector = useDataSelector()
  const activeData = useHoveredFacilities()
  const top = getTopValues(activeData, dataSelector)
  return (
    <FacilitiesMarkerLayer
      style={{ pointerEvents: "none" }}
      markers={top}
      classes={{ spike: classes.spikeHighlight }}
      {...props}
    />
  )
}

export default FacilitiesSpikeHighlight
