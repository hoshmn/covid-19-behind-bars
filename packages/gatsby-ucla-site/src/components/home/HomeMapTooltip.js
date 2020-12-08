import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import ReactTooltip from "react-tooltip"

const MapTooltip = (props) => {
  const hovered = useMapStore((state) => state.hovered)
  const text = hovered && `Click for ${hovered.properties.name} facility data`
  return <ReactTooltip>{text}</ReactTooltip>
}

MapTooltip.propTypes = {}

export default MapTooltip
