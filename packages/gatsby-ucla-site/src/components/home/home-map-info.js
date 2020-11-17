import { useMapHovered } from "@hyperobjekt/svg-maps"
import React from "react"
import useHoveredFacilities from "./use-hovered-facilities"

/**
 * State Title
 * ----
 * - Top 5 highest (current metric + others as secondary)
 * - Facility breakdown (total, federal, prison, jail)
 * - Click for more
 */

const MapTooltip = ({ data, name, ...props }) => {
  const [hovered] = useMapHovered()
  const active = useHoveredFacilities()
  return data && name ? <div>{name}</div> : ""
}

MapTooltip.propTypes = {}

export default MapTooltip
