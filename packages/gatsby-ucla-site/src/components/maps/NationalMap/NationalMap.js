import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../MapGradients"
import FacilitiesMarkerLayer from "../MarkerLayer/FacilitiesMarkerLayer"
import { useShapeStyles } from "../styles"

const NationalMap = memo(
  ({
    children,
    facilities,
    highlightFacilities,
    metric,
    group,
    onSelect,
    ...props
  }) => {
    const shapeClasses = useShapeStyles()
    const isHighlight = highlightFacilities.length > 0
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
          facilities={facilities}
          metric={metric}
          group={group}
          style={{ pointerEvents: "none", opacity: isHighlight ? 0 : 1 }}
        />
        <FacilitiesMarkerLayer
          facilities={highlightFacilities}
          metric={metric}
          group={group}
          style={{ pointerEvents: "none" }}
        />
        {children}
      </SvgMap>
    )
  }
)

NationalMap.defaultProps = {
  highlightFacilities: [],
}

export default NationalMap
