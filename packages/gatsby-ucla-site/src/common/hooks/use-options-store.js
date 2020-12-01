import create from "zustand"
import { METRICS, JURISDICTIONS, JURISDICTION_COLORS } from "../constants"

// grab first group (residents)
const metricGroup = Object.keys(METRICS)[0]

const useOptionsStore = create((set) => ({
  metric: METRICS[metricGroup][0],
  metrics: METRICS[metricGroup],
  categories: JURISDICTIONS,
  selectedCategories: JURISDICTIONS,
  categoryColors: JURISDICTION_COLORS,
  setMetric: (metric) => set({ metric }),
  setMetrics: (options) => set({ options }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default useOptionsStore
