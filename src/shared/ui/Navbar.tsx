import Link from "next/link";
import React from "react";

export default function Navbar() {
	return (
		<header className="flex justify-between">
			<p className="text-lg font-semibold">Book Finder</p>
			<nav className="flex gap-16 text-secondary">
				{/* TODO create page */}
				<Link href="recently-viewed" hidden={true}>
					Recently Viewed
				</Link>
				{/* TODO create search page */}
				<Link href="books">Browse</Link>
				{/* TODO create about page */}
				<Link href="about">About</Link>
				{/* TODO create login */}
				<Link href="login">Login</Link>
			</nav>
		</header>
	);
}
