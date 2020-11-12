import create from "zustand"

const useOptionsStore = create((set) => ({
  metric: "Confirmed",
  metrics: ["Confirmed", "Deaths"],
  categories: ["Prison", "Federal Prison", "Jail"],
  selectedCategories: ["Prison", "Federal Prison", "Jail"],
  categoryColors: ["#CA7F26", "#6BA084", "#758EAC"],
  setMetric: (metric) => set({ metric }),
  setMetrics: (options) => set({ options }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default useOptionsStore
