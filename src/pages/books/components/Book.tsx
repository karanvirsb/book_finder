import React from "react";
import Image from "next/image";

interface BookProps {
	asin: string;
	title: string;
	author: string;
	imageStr: string;
	description: string;
}

export default function Book({
	asin,
	title,
	author,
	imageStr,
	description,
}: BookProps): JSX.Element {
	return (
		<div
			tabIndex={0}
			className="flex max-h-max w-80 flex-col justify-center rounded-2xl bg-white py-2 shadow-xl shadow-gray-400/20"
		>
			<Image
				className="mx-auto object-cover"
				src={imageStr}
				alt={title + " Book Cover"}
				width={180}
				height={300}
			></Image>
			<div className="p-6">
				<h1
					tabIndex={0}
					className="truncate pb-2 text-2xl font-medium text-gray-700"
				>
					{title}
				</h1>
				<small tabIndex={0} className="text-xs text-gray-900">
					{author}
				</small>
				<p tabIndex={0} className="text truncate leading-6 text-gray-500">
					{description}
				</p>
			</div>
		</div>
	);
}
