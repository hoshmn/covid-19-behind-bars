import React from "react"
import { MapGradients, StateMap } from "../maps"
import FacilitiesMarkerLayer from "../maps/MarkerLayer/FacilitiesMarkerLayer"

const FacilitiesMap = ({ group, metric, filter, ...props }) => {
  return (
    <StateMap {...props}>
      <MapGradients />
      <FacilitiesMarkerLayer filter={filter} group={group} metric={metric} />
    </StateMap>
  )
}

FacilitiesMap.propTypes = {}

export default FacilitiesMap
