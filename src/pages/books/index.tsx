import React from "react";
import Layout from "../../shared/ui/Layout";
import Searchbar from "../../shared/ui/Searchbar";
import {
	type Exact,
	type GetBooksByTitleQuery,
	type InputMaybe,
	useGetBooksByTitleQuery,
} from "../../generated/graphql";
import Book from "./components/Book";
import {
	type InferGetStaticPropsType,
	type GetServerSidePropsContext,
} from "next";
import { type UseQueryResponse } from "urql";

export default function Books(
	books: InferGetStaticPropsType<typeof getServerSideProps>
): JSX.Element {
	const [{ data, fetching, error }] = books;
	return (
		<>
			<main className="max-h-max bg-books-background">
				<Layout>
					<section className="my-10 w-full py-10">
						<Searchbar></Searchbar>
					</section>
				</Layout>
			</main>
			<section className="grid grid-cols-1 place-items-center gap-4 px-[clamp(2rem,1rem+7vw,7rem)] xl:grid-cols-3 2xl:grid-cols-4">
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
type useGetBooksByTitleQueryReturn = UseQueryResponse<
	GetBooksByTitleQuery,
	Exact<{
		limit: InputMaybe<number>;
		page: InputMaybe<number>;
		searchQuery: InputMaybe<string>;
	}>
>;
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const limit = Number.parseInt(
		(context.query.limit as unknown as string) ?? "10"
	);
	const page = Number.parseInt(
		(context.query.page as unknown as string) ?? "0"
	);
	const searchQuery = context.query.searchQuery as string;
	const books = useGetBooksByTitleQuery({
		variables: { limit, page, searchQuery },
	});

	return {
		props: books,
	};
}
