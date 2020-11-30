import React, { memo, useCallback, useMemo } from "react"
import MarkerLayer from "./marker-layer"
import { useOptionsStore, useMappableFacilities } from "../../../common/hooks"
import shallow from "zustand/shallow"
import { typeSelector, getDataMetricSelector } from "../../../common/utils"

const FacilitiesMarkerLayer = memo(({ filter, ...props }) => {
  const [metric, categories, categoryColors] = useOptionsStore(
    (state) => [state.metric, state.categories, state.categoryColors],
    shallow
  )
  const facilities = useMappableFacilities()

  const mapFacilities = useMemo(
    () => (filter ? facilities.filter(filter) : facilities),
    [filter, facilities]
  )

  const isDots = props.type && props.type === "dots"
  const size = isDots ? 3.5 : [0, 200]
  const colors = isDots ? categoryColors : ["url(#g1)", "url(#g2)", "url(#g3)"]
  const dataSelector = useCallback(getDataMetricSelector(metric), [metric])
  return (
    <MarkerLayer
      markers={mapFacilities}
      size={size}
      width={7}
      color={colors}
      stroke={categoryColors}
      groups={categories}
      groupSelector={typeSelector}
      sizeSelector={dataSelector}
      {...props}
    />
  )
})

export default FacilitiesMarkerLayer
