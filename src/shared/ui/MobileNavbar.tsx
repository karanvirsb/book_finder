import Link from "next/link";
import React, { useState } from "react";

export default function MobileNavbar(): JSX.Element {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			{/* menu button */}
			{<MenuButton isMenuOpen={isMenuOpen}></MenuButton>}
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
interface menuButtonProps {
	isMenuOpen: boolean;
}
function MenuButton({ isMenuOpen }: menuButtonProps): JSX.Element {
	return (
		<button>
			{isMenuOpen ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			)}
		</button>
	);
}
