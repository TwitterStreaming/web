import { create } from "zustand";
import { getTrendsTweetsOverTime } from "../data/database_caller";

export const useTrends = create((set) => ({
    trends: null,
    isSet:false,
    fetch: async (keyword) => {
        const data = await getTrendsTweetsOverTime(keyword);
        return set({
            trends: data,
            isSet:true,
        });
    },
    setTrends: (trends) => set({ trends, isSet:true }),
}));
