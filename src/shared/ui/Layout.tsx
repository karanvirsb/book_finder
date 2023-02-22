import React from "react";
import Navbar from "./Navbar";

interface props {
	children: React.ReactNode;
}

export default function Layout({ children }: props): JSX.Element {
	return (
		<main className="px-28">
			<Navbar></Navbar>
			{children}
		</main>
	);
}
