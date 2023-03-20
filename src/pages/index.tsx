import { useRef } from "react";
import Layout from "../shared/ui/Layout";
import Searchbar from "../shared/ui/Searchbar";
import { useRouter } from "next/router";

export default function Home(): JSX.Element {
	const router = useRouter();
	const searchQueryRef = useRef("");
	return (
		<main className="relative min-h-[100svh] bg-books-background bg-center bg-no-repeat">
			<Layout classname="relative min-h-[100svh]">
				<section className="absolute top-[50%] left-[50%] flex w-[75%] max-w-[1920px] translate-x-[-50%] translate-y-[-50%] flex-col gap-6">
					<h1 className="text-center text-[clamp(1.69rem,calc(1.40rem+1.41vw),2.50rem)] font-semibold">
						Explore the World of{" "}
						<span className="text-tertiary-500">Books</span> - Find{" "}
						<span className="text-primary_accent">Yours</span> Now!
					</h1>
					<Searchbar
						searchQuery={searchQueryRef}
						submitCb={handleSubmit}
					></Searchbar>
				</section>
			</Layout>
		</main>
	);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		void router.push(
			`/books?limit=12&page=0&searchQuery=${encodeURIComponent(
				searchQueryRef.current
			)}`
		);
	}
}
