import { create } from "zustand";
import { getTrendsTweetsOverTime } from "../data/database_caller";

export const useTrends = create((set) => ({
    trends: null,
    fetch: async (keyword) => {
        const data = await getTrendsTweetsOverTime(keyword);
        return set({
            trends: data,
        });
    },
    setTrends: (trends) => set({ trends, isSet: true }),
}));