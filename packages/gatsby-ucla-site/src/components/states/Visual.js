import React from "react"
import PropTypes from "prop-types"
import { useActiveMetric } from "../../common/hooks"
import useStatesStore from "./use-states-store"
import FacilitiesMap from "./FacilitiesMap"

const Visual = ({ stateName, ...props }) => {
  // current step that is scrolled in view
  const currentStep = useStatesStore((state) => state.currentStep)

  // currently selected metric
  const metric = useActiveMetric()

  // filter for map data to only show current state
  const mapFilter = (f) => f.state === stateName

  // getter for the map group based on step
  const getMapGroup = () => {
    if (currentStep === "staff") return "staff"
    if (currentStep === "facilities") return facilitiesGroup
    return "residents"
  }

  // track group to show for map
  const facilitiesGroup = useStatesStore((state) => state.facilitiesGroup)

  return (
    <div {...props}>
      <FacilitiesMap
        height={800}
        width={700}
        stateName={stateName}
        filter={mapFilter}
        group={getMapGroup()}
        metric={metric}
      />
    </div>
  )
}

Visual.propTypes = {}

export default Visual
