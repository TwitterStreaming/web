import { create } from "zustand";

export const useTotalSearchedTweets = create((set) => ({
    totalSearchedTweets: 0,
    setTotalSearchedTweets: (totalSearchedTweets) =>
        set({ totalSearchedTweets }),
}));
