import React, { memo, useCallback } from "react"
import MarkerLayer from "./marker-layer"
import { useOptionsStore, useSpikeData } from "../../../common/hooks"
import shallow from "zustand/shallow"
import { typeSelector, getDataMetricSelector } from "../../../common/utils"

const FacilitiesMarkerLayer = memo((props) => {
  const [metric, categories, categoryColors] = useOptionsStore(
    (state) => [state.metric, state.categories, state.categoryColors],
    shallow
  )
  const spikes = useSpikeData()
  const isDots = props.type && props.type === "dots"
  const size = isDots ? 3.5 : [0, 200]
  const colors = isDots ? categoryColors : ["url(#g1)", "url(#g2)", "url(#g3)"]
  const dataSelector = useCallback(getDataMetricSelector(metric), [metric])
  return (
    <MarkerLayer
      markers={spikes}
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
