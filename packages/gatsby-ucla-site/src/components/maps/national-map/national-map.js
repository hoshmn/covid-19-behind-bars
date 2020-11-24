import React, { memo } from "react"
import { navigate } from "gatsby"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import FacilitiesSpikeHighlight from "../spike-layer/facilities-spike-highlight"
import MapGradients from "../map-gradients"
import FacilitiesSpikeLayer from "../spike-layer/facilities-spike-layer"
import { useMapStore } from "@hyperobjekt/svg-maps"
import { useShapeStyles } from "../styles"

const NationalMap = memo(({ children, ...props }) => {
  const shapeClasses = useShapeStyles()
  const setSelected = useMapStore((state) => state.setSelected)

  // handler for selection
  const handleSelect = (geo) => {
    setSelected(geo)
    navigate(`states/${geo.properties.name.toLowerCase()}`)
  }
  return (
    <SvgMap {...props}>
      <MapGradients />
      <StateLayer
        classes={shapeClasses}
        onSelect={handleSelect}
        showLabels
        interactive
      />
      <HoverShape className={shapeClasses.shapeHighlight} />
      <FacilitiesSpikeLayer style={{ pointerEvents: "none" }} />
      <FacilitiesSpikeHighlight />
      {children}
    </SvgMap>
  )
})

export default NationalMap
