import React from "react"
import PropTypes from "prop-types"
import { MapGradients, StateMap } from "../maps"
import FacilitiesMarkerLayer from "../maps/marker-layer/facilities-marker-layer"

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
