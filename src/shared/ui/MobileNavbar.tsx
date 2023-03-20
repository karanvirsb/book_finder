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

			<header
				className={`bg-primary fixed bottom-0 left-0 flex w-full flex-col items-center justify-between rounded-t-lg pt-4 transition-transform duration-300 sm:hidden ${
					isMenuOpen ? "translate-y-0" : "translate-y-[100%]"
				}`}
			>
				<p className="text-xl font-semibold">Book Finder</p>
				<nav className="text-secondary flex w-full flex-col items-center gap-6 pt-4">
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
						className="bg-secondary hover:text-secondary hover:outline-secondary w-full border-none py-3 text-center text-primary-500 hover:bg-transparent hover:font-bold hover:outline sm:py-1 sm:px-4"
					>
						Login
					</Link>
				</nav>
			</header>
		</>
	);
}
