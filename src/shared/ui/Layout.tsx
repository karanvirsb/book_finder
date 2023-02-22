import React from "react";
import Navbar from "./Navbar";

interface props {
	children: React.ReactNode;
}

export default function Layout({ children }: props): JSX.Element {
	return (
		<main className="px-[clamp(2rem,1rem+7vw,7rem)]">
			<Navbar></Navbar>
			{children}
		</main>
	);
}
