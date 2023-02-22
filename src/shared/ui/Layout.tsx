import React from "react";
import Navbar from "./Navbar";

interface props {
	children: React.ReactNode;
}

export default function Layout({ children }: props): JSX.Element {
	return (
		<>
			<Navbar></Navbar>
			{children}
		</>
	);
}
