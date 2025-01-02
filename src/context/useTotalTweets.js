import { create } from "zustand";
import { getTotalTweets } from "../data/database_caller";

export const useTotalTweets = create((set) => ({
    totalTweets: 0,
    setTotalTweets: async () => {
        const totalTweets = (await getTotalTweets()).total_count;
        return set({
            totalTweets,
        });
    },
}));
