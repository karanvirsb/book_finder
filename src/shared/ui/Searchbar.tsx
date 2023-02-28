import React from "react";

interface ISearchbar {
	searchQuery: React.MutableRefObject<string>;
	submitCb: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Searchbar({
	searchQuery,
	submitCb,
}: ISearchbar): JSX.Element {
	return (
		<form
			className="flex flex-col gap-3 sm:flex-row"
			onSubmit={(e) => {
				submitCb(e);
			}}
		>
			<input
				className="min-h-[35px] flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary"
				placeholder="Search for Books"
				onChange={(e) => {
					searchQuery.current = e.target.value;
				}}
			/>
			<button
				type="submit"
				className="max-h-[35px] rounded-full bg-tertiary py-1 uppercase text-primary sm:max-h-max sm:py-2 sm:px-4"
			>
				search
			</button>
		</form>
	);
}
