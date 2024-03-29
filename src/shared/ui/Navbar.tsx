import Link from "next/link";
import React from "react";
import LoginButton from "./loginButton";
import { useSession } from "next-auth/react";

interface NavbarProps {
	classname?: string;
}

export default function Navbar({ classname }: NavbarProps): JSX.Element {
	const { data: session } = useSession();

	return (
		<header
			className={`hidden items-center justify-between pt-2 sm:flex ${
				classname ?? ""
			}`}
		>
			<Link href="/" className="text-xl font-semibold">
				Book Finder
			</Link>
			<nav className="flex items-center gap-[clamp(1rem,1rem+3svw,4rem)] text-secondary-500">
				{/* TODO create page */}
				{session != null && <Link href="favourites">Favourites</Link>}
				{/* TODO create search page */}
				<Link
					href={{
						pathname: "books",
						query: { limit: 12, page: 0, searchQuery: "" },
					}}
				>
					Browse
				</Link>
				{/* TODO create about page */}
				<Link href="about">About</Link>
				{/* TODO create login */}
				<LoginButton></LoginButton>
				{/* <Link
					href="login"
					className="hover:text-secondary-500 hover:outline-secondary-500 rounded-full border-none bg-secondary-500 py-1 px-4 text-primary-500 hover:bg-transparent hover:font-bold hover:outline"
				>
					Login
				</Link> */}
			</nav>
		</header>
	);
}
