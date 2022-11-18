import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FilterState {
  selectedGame: string;
  selectedRegion: string;
  selectedPlatform: string;
  selectedGameImage: string;
  setSelectedGame: (selectedGame: string) => void;
  setSelectedRegion: (selectedRegion: string) => void;
  setSelectedPlatform: (selectedPlatform: string) => void;
  setSelectedGameImage: (gameImage: string) => void;
}

const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        selectedGame: "",
        selectedRegion: "",
        selectedPlatform: "",
        selectedGameImage: "",
        setSelectedGame: (selectedGame) => set({ selectedGame }),
        setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
        setSelectedPlatform: (selectedPlatform) => set({ selectedPlatform }),
        setSelectedGameImage: (selectedGameImage) => set({ selectedGameImage }),
      }),
      {
        name: "filter-storage",
        getStorage: () => sessionStorage,
      }
    )
  )
);

export default useFilterStore;
