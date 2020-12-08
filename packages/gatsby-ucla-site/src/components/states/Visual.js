import React from "react"
import { useActiveMetric } from "../../common/hooks"
import useStatesStore from "./useStatesStore"
import FacilitiesMap from "./FacilitiesMap"
import { useSpring, animated } from "react-spring"

const styles = (theme) => ({
  root: {},
})

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

  const mapStyle = useSpring({
    opacity:
      ["residents", "staff", "facilities"].indexOf(currentStep) === -1 ? 0 : 1,
  })

  // track group to show for map
  const facilitiesGroup = useStatesStore((state) => state.facilitiesGroup)

  return (
    <animated.div style={mapStyle} {...props}>
      <FacilitiesMap
        height={800}
        width={700}
        stateName={stateName}
        filter={mapFilter}
        group={getMapGroup()}
        metric={metric}
      />
    </animated.div>
  )
}

Visual.propTypes = {}

export default Visual
