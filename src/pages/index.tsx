import { useEffect, useState } from "react";
import Layout from "../shared/ui/Layout";

export default function Home(): JSX.Element {
	return (
		<main className="min-h-[100svh] bg-books-background bg-center bg-no-repeat">
			<Layout>
				<h1>
					Explore the World of <span className="text-tertiary">Books</span> -
					Find <span className="text-primary_accent">Yours</span> Now!
				</h1>
			</Layout>
		</main>
	);
}
