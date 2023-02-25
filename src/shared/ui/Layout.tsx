import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

interface props {
	children: React.ReactNode;
}

export default function Layout({ children }: props): JSX.Element {
	return (
		<main className="relative min-h-[100svh] px-[clamp(2rem,1rem+7vw,7rem)]">
			<Navbar></Navbar>
			<MobileNavbar></MobileNavbar>
			{children}
		</main>
	);
}
