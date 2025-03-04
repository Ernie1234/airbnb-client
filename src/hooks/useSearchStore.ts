import { create } from "zustand";

interface SearchState {
  category: string | undefined; // Store a single category
  location: string | undefined;
  setSearchParams: (params: { category?: string; location?: string }) => void;
  toggleCategory: (category: string) => void; // Toggle category
}

export const useSearchStore = create<SearchState>((set) => ({
  category: undefined,
  location: undefined,
  setSearchParams: (params) =>
    set(() => ({
      category: params.category,
      location: params.location,
    })),
  toggleCategory: (category) =>
    set((state) => ({
      category: state.category === category ? undefined : category, // Toggle logic
    })),
}));
