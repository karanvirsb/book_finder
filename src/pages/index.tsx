import { useEffect, useState } from "react";
import Layout from "../shared/ui/Layout";

export default function Home(): JSX.Element {
	return (
		<main className="relative min-h-[100svh] bg-books-background bg-center bg-no-repeat">
			<Layout>
				<section className="absolute top-[50%] left-[50%] flex w-[75%] max-w-[1920px] translate-x-[-50%] translate-y-[-50%] flex-col gap-6">
					<h1 className="text-center text-[clamp(1.69rem,calc(1.40rem+1.41vw),2.50rem)] font-semibold">
						Explore the World of <span className="text-tertiary">Books</span> -
						Find <span className="text-primary_accent">Yours</span> Now!
					</h1>
					<form className="flex flex-col gap-3 sm:flex-row">
						<input
							className="min-h-[35px] flex-grow rounded-full border-none px-2 outline outline-1 outline-secondary"
							placeholder="Search for Books"
						/>
						<button
							type="submit"
							className="max-h-[35px] rounded-full bg-tertiary py-1 uppercase text-primary sm:max-h-max sm:py-2 sm:px-4"
						>
							search
						</button>
					</form>
				</section>
			</Layout>
		</main>
	);
}
