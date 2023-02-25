import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

interface props {
	children?: React.ReactNode;
	navbarClassName?: string;
	classname?: string;
}

export default function Layout({
	children,
	navbarClassName,
	classname,
}: props): JSX.Element {
	return (
		<main className={`${classname ?? ""} px-[clamp(2rem,1rem+7vw,7rem)]`}>
			<Navbar classname={navbarClassName}></Navbar>
			<MobileNavbar></MobileNavbar>
			{children}
		</main>
	);
}
