import Link from "next/link";
import React from "react";

export default function Navbar(): JSX.Element {
	return (
		<header className="hidden items-center justify-between pt-2 sm:flex">
			<p className="text-xl font-semibold">Book Finder</p>
			<nav className="flex items-center gap-[clamp(1rem,1rem+3svw,4rem)] text-secondary">
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
					className="rounded-full border-none bg-secondary py-1 px-4 text-primary hover:bg-transparent hover:font-bold hover:text-secondary hover:outline hover:outline-secondary"
				>
					Login
				</Link>
			</nav>
		</header>
	);
}
