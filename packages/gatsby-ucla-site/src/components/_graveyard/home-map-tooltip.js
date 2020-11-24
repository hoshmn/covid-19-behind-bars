import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import ReactTooltip from "react-tooltip"
import useHoveredFacilities from "../../common/hooks/use-hovered-facilities"

const HomeMapTooltip = (props) => {
  const hoveredFacilities = useHoveredFacilities()
  const names = hoveredFacilities.map((d) => d.Name).slice(0, 5)
  const isHovered = useMapStore((state) => Boolean(state.hovered))
  return (
    <ReactTooltip>
      {isHovered && names.map((name) => <div key={name}>{name}</div>)}
    </ReactTooltip>
  )
}

HomeMapTooltip.propTypes = {}

export default HomeMapTooltip
