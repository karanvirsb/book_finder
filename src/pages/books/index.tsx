import React from "react";
import Layout from "../../shared/ui/Layout";
import Searchbar from "../../shared/ui/Searchbar";
import client from "../../urql";
import {
	GetBooksByTitleDocument,
	useGetBooksByTitleQuery,
} from "../../generated/graphql";
import { useQuery } from "urql";
import Book from "./components/Book";

export default function Books(): JSX.Element {
	const [{ data, fetching, error }] = useGetBooksByTitleQuery({
		variables: { limit: 10, page: 0, searchQuery: "" },
	});
	return (
		<>
			<main className="max-h-max bg-books-background">
				<Layout>
					<section className="my-10 w-full  py-10">
						<Searchbar></Searchbar>
					</section>
				</Layout>
			</main>
			<section className=" grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{/* // add spinner */}
				{fetching ? <p>Loading...</p> : null}
				{error != null ? <p>Oh no ... {error.message}</p> : null}
				{data?.getBooksByTitleResolver != null
					? data.getBooksByTitleResolver.map((book) => {
							return (
								<Book
									asin={book?.asin ?? ""}
									author={book?.author?.name ?? ""}
									description={book?.description ?? ""}
									imageStr={book?.image_url ?? ""}
									title={book?.title ?? ""}
									key={book?.asin}
								></Book>
							);
					  })
					: "Could not find any books."}
			</section>
		</>
	);
}
