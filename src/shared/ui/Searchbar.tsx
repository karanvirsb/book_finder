import React from "react";

export default function Searchbar(): JSX.Element {
	return (
		<form className="flex flex-col gap-3 sm:flex-row">
			<input
				className="min-h-[35px] flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary"
				placeholder="Search for Books"
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
