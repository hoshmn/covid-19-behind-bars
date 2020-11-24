import React, { memo, useCallback, useContext } from "react"
import SpikeLayer from "./spike-layer"
import { useOptionsStore, useSpikeData } from "../../../common/hooks"
import shallow from "zustand/shallow"
import {
  typeSelector,
  widthSelector,
  getDataMetricSelector,
} from "../../../common/utils"

const FacilitiesSpikeLayer = memo((props) => {
  const [metric, categories, categoryColors] = useOptionsStore(
    (state) => [state.metric, state.categories, state.categoryColors],
    shallow
  )
  const spikes = useSpikeData()
  const dataSelector = useCallback(getDataMetricSelector(metric), [metric])

  return (
    <SpikeLayer
      spikes={spikes}
      length={[0, 200]}
      width={7}
      color={["url(#g1)", "url(#g2)", "url(#g3)"]}
      stroke={categoryColors}
      groups={categories}
      groupSelector={typeSelector}
      lengthSelector={dataSelector}
      widthSelector={widthSelector}
      {...props}
    />
  )
})

export default FacilitiesSpikeLayer
