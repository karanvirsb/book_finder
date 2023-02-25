import Link from "next/link";
import React, { useState } from "react";
import MenuButton from "./MenuButton";

export default function MobileNavbar(): JSX.Element {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			{/* menu button */}
			{
				<MenuButton
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
				></MenuButton>
			}
			{isMenuOpen ? (
				<header className="fixed bottom-0 left-0 flex w-full flex-col items-center justify-between bg-primary pt-4 sm:hidden">
					<p className="text-xl font-semibold">Book Finder</p>
					<nav className="flex w-full flex-col items-center gap-6 pt-4 text-secondary">
						{/* TODO create page */}
						<Link
							href="recently-viewed"
							hidden={true}
							className="w-full py-2 text-center"
						>
							Recently Viewed
						</Link>
						{/* TODO create search page */}
						<Link href="books" className="w-full py-2 text-center">
							Browse
						</Link>
						{/* TODO create about page */}
						<Link href="about" className="w-full py-2 text-center">
							About
						</Link>
						{/* TODO create login */}
						<Link
							href="login"
							className="w-full border-none bg-secondary py-3 text-center text-primary hover:bg-transparent hover:font-bold hover:text-secondary hover:outline hover:outline-secondary sm:py-1 sm:px-4"
						>
							Login
						</Link>
					</nav>
				</header>
			) : null}
		</>
	);
}
