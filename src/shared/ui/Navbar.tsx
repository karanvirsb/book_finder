import Link from "next/link";
import React from "react";

export default function Navbar() {
	return (
		<header className="flex items-center justify-between pt-2">
			<p className="text-xl font-semibold">Book Finder</p>
			<nav className="flex items-center gap-16 text-secondary">
				{/* TODO create page */}
				<Link href="recently-viewed" hidden={true}>
					Recently Viewed
				</Link>
				{/* TODO create search page */}
				<Link href="books">Browse</Link>
				{/* TODO create about page */}
				<Link href="about">About</Link>
				{/* TODO create login */}
				<Link
					href="login"
					className="rounded-full bg-secondary py-2 px-4 text-primary"
				>
					Login
				</Link>
			</nav>
		</header>
	);
}
