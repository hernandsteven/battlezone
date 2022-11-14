import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FilterState {
    selectedGame: string,
    selectedRegion: string,
    selectedPlatform: string,
    setSelectedGame: (selectedGame: string) => void,
    setSelectedRegion: (selectedRegion: string) => void,
    setSelectedPlatform: (selectedPlatform: string) => void,

}

const useFilterStore = create<FilterState>()(
    devtools(
        persist(
            (set) => ({
                selectedGame:'',
                selectedRegion:'',
                selectedPlatform:'',
                setSelectedGame: (selectedGame) => set({ selectedGame }),
                setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
                setSelectedPlatform: (selectedPlatform) => set({ selectedPlatform }),
            }),
            {
                name: 'filter-storage',
                getStorage: () => sessionStorage,
            }
        )
    )
)

export default useFilterStore