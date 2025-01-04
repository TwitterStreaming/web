import { create } from "zustand";

export const useTweetsNoLocation = create((set) => ({
    totalNoLocation: 0,
    setTotalNoLocation: (totalNoLocation) => set({ totalNoLocation }),
}));
