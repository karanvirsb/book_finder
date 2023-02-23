import { useEffect, useState } from "react";
import Layout from "../shared/ui/Layout";

export default function Home(): JSX.Element {
	return (
		<main className="relative min-h-[100svh] bg-books-background bg-center bg-no-repeat">
			<Layout>
				<section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<h1 className="text-center text-[clamp(1.69rem,calc(1.40rem+1.41vw),2.50rem)] font-semibold">
						Explore the World of <span className="text-tertiary">Books</span> -
						Find <span className="text-primary_accent">Yours</span> Now!
					</h1>
					<form className="flex gap-3">
						<input
							className="flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary"
							placeholder="Search for Books"
						/>
						<button
							type="submit"
							className="rounded-full bg-tertiary py-1 px-3 uppercase text-primary"
						>
							search
						</button>
					</form>
				</section>
			</Layout>
		</main>
	);
}
