import { create } from "zustand";
import { extractLocation } from "../utils/extract_data";

export const useLocation = create((set) => ({
    locations: [],
    fetch: (tweet) => set({ locations: extractLocation(tweet) }),
    setLocations: (locations) => set({ locations }),
}));
