import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../map-gradients"
import FacilitiesMarkerLayer from "../marker-layer/facilities-marker-layer"
import { useShapeStyles } from "../styles"
// import FacilitiesSpikeHighlight from "../spike-layer/facilities-spike-highlight"

const NationalMap = memo(({ children, onSelect, ...props }) => {
  const shapeClasses = useShapeStyles()
  return (
    <SvgMap {...props}>
      <MapGradients />
      <StateLayer
        classes={shapeClasses}
        onSelect={onSelect}
        showLabels
        interactive
      />
      <HoverShape className={shapeClasses.shapeHighlight} />
      <FacilitiesMarkerLayer style={{ pointerEvents: "none" }} />
      {/* <FacilitiesSpikeHighlight /> */}
      {children}
    </SvgMap>
  )
})

export default NationalMap
