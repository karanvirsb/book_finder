import React, { type SetStateAction } from "react";

interface ISearchbar {
	setSearchQuery: React.Dispatch<SetStateAction<string>>;
	searchQuery: string;
	submitCb: () => void;
}

export default function Searchbar({
	searchQuery,
	setSearchQuery,
	submitCb,
}: ISearchbar): JSX.Element {
	return (
		<form className="flex flex-col gap-3 sm:flex-row">
			<input
				className="min-h-[35px] flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary"
				placeholder="Search for Books"
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.target.value);
				}}
			/>
			<button
				type="submit"
				className="max-h-[35px] rounded-full bg-tertiary py-1 uppercase text-primary sm:max-h-max sm:py-2 sm:px-4"
				onClick={() => {
					submitCb();
				}}
			>
				search
			</button>
		</form>
	);
}
