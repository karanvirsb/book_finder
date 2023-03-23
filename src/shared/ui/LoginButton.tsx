import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function LoginButton(): JSX.Element {
	const { data: session } = useSession();
	if (session != null) {
		return (
			<button
				className="rounded-full border-none bg-secondary-500 py-1 px-4 text-primary-500 hover:bg-transparent hover:font-bold hover:text-secondary-500 hover:outline hover:outline-secondary-500"
				onClick={() => {
					void signOut();
				}}
			>
				Logout
			</button>
		);
	}
	return (
		<button
			className="rounded-full border-none bg-secondary-500 py-1 px-4 text-primary-500 hover:bg-transparent hover:font-bold hover:text-secondary-500 hover:outline hover:outline-secondary-500"
			onClick={() => {
				void signIn();
			}}
		>
			Login
		</button>
	);
}
