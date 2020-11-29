import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import FacilitiesSpikeHighlight from "../spike-layer/facilities-spike-highlight"
import MapGradients from "../map-gradients"
import FacilitiesSpikeLayer from "../spike-layer/facilities-spike-layer"
import { useShapeStyles } from "../styles"

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
      <FacilitiesSpikeLayer style={{ pointerEvents: "none" }} />
      {/* <FacilitiesSpikeHighlight /> */}
      {children}
    </SvgMap>
  )
})

export default NationalMap
