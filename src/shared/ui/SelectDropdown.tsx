import React, { type ChangeEventHandler } from "react";

interface dropdownProps {
	name: string;
	onchange: ChangeEventHandler;
	value: any;
	options: Array<{ name: string; value: any }>;
}

export default function SelectDropdown({
	name,
	onchange,
	value,
	options,
}: dropdownProps): JSX.Element {
	return (
		<>
			<label htmlFor={`dropdown-${name}`}>Per Page:</label>
			<select
				className="relative ml-4 inline-block rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-secondary hover:bg-gray-50 hover:text-primary_accent"
				id={`dropdown-${name}`}
				onChange={onchange}
				value={value}
			>
				{options.map((obj) => {
					return (
						<option
							key={obj.name}
							className="mb-3 rounded-md px-4 py-2 text-lg text-gray-700"
							role="menuitem"
							tabIndex={-1}
							value={obj.value}
						>
							{obj.name}
						</option>
					);
				})}
			</select>
		</>
	);
}
