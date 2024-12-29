import { create } from "zustand";
import { searchByKeyword } from "../data/database_caller";

export const useSearchByKeyword = create((set) => ({
    data: null,
    setSearchedData: (data) => set({ data: data }),
    fetch: async (keyword) => {
        const data = await searchByKeyword(keyword);
        return set({
            data: data,
        });
    },
}));
