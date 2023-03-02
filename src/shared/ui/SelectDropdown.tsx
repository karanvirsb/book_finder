import React from "react";

interface dropdownProps {
	name: string;
	children?: React.ReactNode;
}

export default function SelectDropdown({ name, children }: dropdownProps) {
	return (
		<>
			<label htmlFor={`dropdown-${name}`}>Per Page:</label>
			<select
				className="relative ml-4 inline-block rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				id={`dropdown-${name}`}
			>
				{children}
			</select>
		</>
	);
}
