import create from "zustand"
import { GROUPS } from "../../common/constants"

/**
 * Store for state information releative to the "states" pages
 */
const useStatesStore = create((set) => ({
  currentStep: null,
  setCurrentStep: (currentStep) => set({ currentStep }),
  facilitiesGroup: GROUPS[0],
  setFacilitiesGroup: (facilitiesGroup) => set({ facilitiesGroup }),
}))

export default useStatesStore
