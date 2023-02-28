import React, { useState } from "react";
import Layout from "../../shared/ui/Layout";
import Searchbar from "../../shared/ui/Searchbar";
import {
	type GetBooksByTitleQuery,
	useGetBooksByTitleQuery,
	GetBooksByTitleDocument,
	type GetBooksByTitleQueryVariables,
} from "../../generated/graphql";
import Book from "./components/Book";
import { type GetServerSidePropsContext } from "next";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { type SSRData, initUrqlClient, withUrqlClient } from "next-urql";

interface bookParams {
	limit: number;
	page: number;
}
function Books(): JSX.Element {
	const [bookParams, setBookParams] = useState<bookParams>({
		limit: 10,
		page: 0,
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [{ data, fetching, error }] = useGetBooksByTitleQuery({
		variables: {
			limit: bookParams.limit,
			page: bookParams.page,
			searchQuery,
		},
	});
	return (
		<>
			<main className="max-h-max bg-books-background">
				<Layout>
					<section className="my-10 w-full py-10">
						<Searchbar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							submitCb={handleSubmit}
						></Searchbar>
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

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{
	props: {
		urqlState: SSRData;
	};
}> {
	const limit = Number.parseInt(
		(context.query.limit as unknown as string) ?? "10"
	);
	const page = Number.parseInt(
		(context.query.page as unknown as string) ?? "0"
	);
	const searchQuery = context.query.searchQuery as string;
	// TODO turn into function
	const ssrCache = ssrExchange({ isClient: false });
	const client = initUrqlClient(
		{
			url: "http://localhost:3000/api/graphql",
			exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
		},
		false
	);

	const books = client
		?.query<GetBooksByTitleQuery, GetBooksByTitleQueryVariables>(
			GetBooksByTitleDocument,
			{ limit, page, searchQuery }
		)
		.toPromise();

	return {
		props: { urqlState: ssrCache.extractData() },
	};
}

export default withUrqlClient(
	(ssr) => ({
		url: "http://localhost:3000/api/graphql",
	})
	// Cannot specify { ssr: true } here so we don't wrap our component in getInitialProps
)(Books);
