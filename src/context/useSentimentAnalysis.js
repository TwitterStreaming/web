import { create } from "zustand";
import { getAverageSentimentAnalysis } from "../data/database_caller";

export const useAverageSentiment = create((set) => ({
    averageSentiment: null,
    setAverageSentiment: (data) => set({ averageSentiment: data }),
    fetch: async (keyword) => {
        const data = await getAverageSentimentAnalysis(keyword);
        return set({
            averageSentiment: data,
        });
    },
}));