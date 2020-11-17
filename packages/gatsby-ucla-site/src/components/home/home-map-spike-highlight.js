import React from "react"
import { useOptionsStore, useSpikeData } from "../../utils"
import { typeSelector, widthSelector } from "../../utils/selectors"
import SpikeLayer from "../spike-layer"
import shallow from "zustand/shallow"
import { extent } from "d3-array"
import useDataSelector from "./use-data-selector"
import useHoveredFacilities from "./use-hovered-facilities"
import { getTopValues } from "./utils"

const HomeSpikeHighlight = (props) => {
  const [categories, categoryColors] = useOptionsStore(
    (state) => [state.categories, state.categoryColors],
    shallow
  )
  const spikes = useSpikeData()
  const dataSelector = useDataSelector()
  const activeData = useHoveredFacilities()
  const top = getTopValues(activeData, dataSelector)
  const lengthExtent = extent(spikes, dataSelector)
  return (
    <SpikeLayer
      spikes={top}
      length={[0, 200]}
      lengthExtent={lengthExtent}
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
}

export default HomeSpikeHighlight
