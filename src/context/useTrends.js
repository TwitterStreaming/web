import { create } from "zustand";
import { getTrendsTweetsOverTime } from "../data/database_caller";

export const useTrends = create((set) => ({
    trends: null,
    intervalTime: "1d",
    fetch: async (query, interval) => {
        const data = await getTrendsTweetsOverTime(query, interval);
        return set({
            trends: data,
        });
    },
    setTrends: (trends) => set({ trends }),
    setInterval: (interval) =>
        set({
            intervalTime: interval,
        }),
}));
