import React from "react";
import useBookParamsStore from "../zustand/bookParams";

interface ISearchbar {
	submitCb: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Searchbar({ submitCb }: ISearchbar): JSX.Element {
	const [bookParams, setBookParams] = useBookParamsStore((state) => [
		state.params,
		state.setParams,
	]);
	return (
		<form className="flex flex-col gap-3 sm:flex-row" onSubmit={submitCb}>
			<input
				defaultValue={bookParams.searchQuery}
				className="min-h-[35px] flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary-500"
				placeholder="Search for Books"
				onChange={(e) => {
					setBookParams({ searchQuery: e.target.value });
				}}
			/>
			<button
				type="submit"
				className="max-h-[35px] rounded-full bg-tertiary-500 py-1 uppercase text-primary-500 sm:max-h-max sm:py-2 sm:px-4"
			>
				search
			</button>
		</form>
	);
}
