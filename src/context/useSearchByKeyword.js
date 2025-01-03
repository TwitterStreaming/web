import { create } from "zustand";
import { searchByKeyword } from "../data/database_caller";

export const useSearchByKeyword = create((set) => ({
    data: null,
    setSearchedData: (data) => set({ data: data }),
    fetch: async (keyword, setAllSearchedTweets, setTotalNoLocation) => {
        const data = await searchByKeyword(keyword);
        setAllSearchedTweets(data?.total || 0);

        let totalNoLocation = 0;

        data?.tweets?.forEach((tweet) => {
            if (tweet._source.geo_coordinates.lat === undefined) {
                totalNoLocation++;
            }
        });

        setTotalNoLocation(totalNoLocation);
        return set({
            data: data,
        });
    },
}));
