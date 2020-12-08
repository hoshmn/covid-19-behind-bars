import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../MapGradients"
import FacilitiesMarkerLayer from "../MarkerLayer/FacilitiesMarkerLayer"
import { useShapeStyles } from "../styles"
// import FacilitiesSpikeHighlight from "../spike-layer/facilities-spike-highlight"

const NationalMap = memo(({ children, metric, group, onSelect, ...props }) => {
  const shapeClasses = useShapeStyles()
  return (
    <SvgMap {...props}>
      <MapGradients />
      <StateLayer
        classes={{
          shape: shapeClasses.shape,
          label: shapeClasses.shapeLabel,
        }}
        onSelect={onSelect}
        showLabels
        interactive
      />
      <HoverShape className={shapeClasses.shapeHighlight} />
      <FacilitiesMarkerLayer
        metric={metric}
        group={group}
        style={{ pointerEvents: "none" }}
      />
      {/* <FacilitiesSpikeHighlight /> */}
      {children}
    </SvgMap>
  )
})

export default NationalMap
