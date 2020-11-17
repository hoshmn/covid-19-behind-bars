import { useMapHovered } from "@hyperobjekt/svg-maps"
import { useMemo } from "react"
import { useSpikeData } from "../../utils"
import useDataSelector from "./use-data-selector"
import { getTopValues } from "./utils"

export default function useHoveredFacilities() {
  const [hovered] = useMapHovered()
  const spikes = useSpikeData()
  return useMemo(() => {
    return hovered
      ? spikes.filter((d) => d.State === hovered.properties.name)
      : spikes
  }, [hovered, spikes])
}
