import React, { type ChangeEventHandler } from "react";

interface dropdownProps {
	name: string;
	children: React.ReactNode;
	onchange: ChangeEventHandler;
	defaultvalue?: string[];
}

export default function SelectDropdown({
	name,
	children,
	onchange,
	defaultvalue,
}: dropdownProps): JSX.Element {
	return (
		<>
			<label htmlFor={`dropdown-${name}`}>Per Page:</label>
			<select
				className="relative ml-4 inline-block rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-secondary hover:bg-gray-50 hover:text-primary_accent"
				id={`dropdown-${name}`}
				onChange={onchange}
				defaultValue={defaultvalue ?? []}
			>
				{children}
			</select>
		</>
	);
}
