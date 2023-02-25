import React from "react";
import Layout from "../../shared/ui/Layout";
import Searchbar from "../../shared/ui/Searchbar";

export default function Books(): JSX.Element {
	return (
		<>
			<main className="max-h-max bg-books-background">
				<Layout>
					<section className="my-10 w-full  py-10">
						<Searchbar></Searchbar>
					</section>
				</Layout>
			</main>
		</>
	);
}
