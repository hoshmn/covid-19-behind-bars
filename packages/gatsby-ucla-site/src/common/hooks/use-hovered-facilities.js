import { useMapHovered } from "@hyperobjekt/svg-maps"
import { useMemo } from "react"
import useSpikeData from "./use-spike-data"

export default function useHoveredFacilities() {
  const [hovered] = useMapHovered()
  const spikes = useSpikeData()
  return useMemo(() => {
    return hovered
      ? spikes.filter((d) => d.state === hovered.properties.name)
      : spikes
  }, [hovered, spikes])
}
