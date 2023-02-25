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
		<div className="mx-auto flex w-80 flex-col justify-center rounded-2xl bg-white shadow-xl shadow-gray-400/20">
			<Image
				className="aspect-square w-80 rounded-t-2xl object-cover object-center"
				src={imageStr}
				alt={title + " Book Cover"}
			></Image>
			<div className="p-6">
				<h1 className="pb-2 text-2xl font-medium text-gray-700">{title}</h1>
				<small className="text-xs text-gray-900">{author}</small>
				<p className="text leading-6 text-gray-500">{description}</p>
			</div>
		</div>
	);
}
