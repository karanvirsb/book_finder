import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

interface props {
	children?: React.ReactNode;
	navbarClassName?: string;
}

export default function Layout({
	children,
	navbarClassName,
}: props): JSX.Element {
	return (
		<main className="relative min-h-[100svh] px-[clamp(2rem,1rem+7vw,7rem)]">
			<Navbar classname={navbarClassName}></Navbar>
			<MobileNavbar></MobileNavbar>
			{children}
		</main>
	);
}
