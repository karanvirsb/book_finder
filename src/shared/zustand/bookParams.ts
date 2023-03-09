"use client";
import { useDebugValue } from "react";
import { create } from "zustand";

export interface paramsType {
	searchQuery: string;
	limit: number;
	page: number;
}

interface BookParamsState {
	params: paramsType;
	setParams: (params: Partial<paramsType>) => void;
}

const useBookParamsStore = create<BookParamsState>()((set) => ({
	params: { searchQuery: "", limit: 10, page: 0 },
	setParams: (newParams) => {
		set((state) => ({ params: { ...state.params, ...newParams } }));
	},
}));

export default useBookParamsStore;
