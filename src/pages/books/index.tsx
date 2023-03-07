import React, { useRef } from "react";
import Layout from "../../shared/ui/Layout";
import Searchbar from "../../shared/ui/Searchbar";
import {
	// type GetBooksByTitleQuery,
	useGetBooksByTitleQuery,
	// GetBooksByTitleDocument,
	// type GetBooksByTitleQueryVariables,
} from "../../generated/graphql";
import Book from "./components/Book";
// import { type GetServerSidePropsContext } from "next";
// import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
// import { type SSRData, initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import SelectDropdown from "../../shared/ui/SelectDropdown";
import Pagination from "../../shared/ui/Pagination/Pagination";

export default function Books(): JSX.Element {
	const router = useRouter();

	const searchQueryRef = useRef<string>("");
	const limitQueryRef = useRef<number>(12);
	const pageQueryRef = useRef<number>(0);
	searchQueryRef.current = (router.query.searchQuery as string) ?? "";
	limitQueryRef.current = Number.parseInt(router.query.limit as string) ?? 12;
	pageQueryRef.current = Number.parseInt(router.query.page as string) ?? 0;

	console.log(limitQueryRef, searchQueryRef, pageQueryRef);
	const [{ data, fetching, error }] = useGetBooksByTitleQuery({
		variables: {
			limit: limitQueryRef.current,
			page: pageQueryRef.current,
			searchQuery: searchQueryRef.current,
		},
	});
	return (
		<>
			<main className="max-h-max bg-books-background">
				<Layout>
					<section className="my-10 w-full py-10">
						<Searchbar
							searchQuery={searchQueryRef}
							submitCb={handleSubmit}
						></Searchbar>
					</section>
				</Layout>
			</main>
			<section className="px-[clamp(2rem,1rem+7vw,7rem)]">
				<div className="flex w-full items-center justify-end">
					<SelectDropdown
						name="Per Page"
						onchange={handleSelectChange}
						defaultvalue={limitQueryRef.current}
						options={[
							{ name: "12", value: 12 },
							{ name: "16", value: 16 },
							{ name: "20", value: 20 },
						]}
					></SelectDropdown>
				</div>
				<article className="grid grid-cols-1 place-items-center gap-4 xl:grid-cols-3 2xl:grid-cols-4">
					{/* // add spinner */}
					{fetching ? (
						<p>Loading...</p>
					) : error != null ? (
						<p>Oh no ... {error.message}</p>
					) : data?.getBooksByTitleResolver?.books != null &&
					  data.getBooksByTitleResolver.books.length > 0 ? (
						data.getBooksByTitleResolver.books.map((book) => {
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
					) : (
						<p>Could not find any books.</p>
					)}
				</article>
				<Pagination
					currPageNumber={pageQueryRef.current + 1}
					limit={limitQueryRef.current}
					totalCount={data?.getBooksByTitleResolver?.count ?? 0}
					routerCb={updateBrowserPage}
				></Pagination>
			</section>
		</>
	);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		pageQueryRef.current = 0; // reseting page
		void router.push(
			`/books?limit=${limitQueryRef.current}&page=${
				pageQueryRef.current
			}&searchQuery=${encodeURIComponent(searchQueryRef.current)}`
		);
	}

	function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
		limitQueryRef.current = Number.parseInt(e.target.value.trim());
		pageQueryRef.current = 0; // reseting page
		void router.push(
			`/books?limit=${Number.parseInt(e.target.value.trim())}&page=${
				pageQueryRef.current
			}&searchQuery=${encodeURIComponent(searchQueryRef.current)}`
		);
	}

	// TODO rename
	/**
	 *
	 * @param newPage is a numeric value that will change the page query
	 */
	function updateBrowserPage(newPage: number): void {
		pageQueryRef.current = newPage;
		void router.push(
			`/books?limit=${limitQueryRef.current}&page=${
				pageQueryRef.current
			}&searchQuery=${encodeURIComponent(searchQueryRef.current)}`
		);
	}
}

// export async function getServerSideProps(
// 	context: GetServerSidePropsContext
// ): Promise<{
// 	props: {
// 		urqlState: SSRData;
// 	};
// }> {
// 	const limit = Number.parseInt(
// 		(context.query.limit as unknown as string) ?? "10"
// 	);
// 	const page = Number.parseInt(
// 		(context.query.page as unknown as string) ?? "0"
// 	);
// 	const searchQuery = context.query.searchQuery as string;
// 	// TODO turn into function
// 	const ssrCache = ssrExchange({ isClient: false });
// 	const client = initUrqlClient(
// 		{
// 			url: "http://localhost:3000/api/graphql",
// 			exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
// 		},
// 		false
// 	);

// 	await client
// 		?.query<GetBooksByTitleQuery, GetBooksByTitleQueryVariables>(
// 			GetBooksByTitleDocument,
// 			{ limit, page, searchQuery }
// 		)
// 		.toPromise();

// 	return {
// 		props: { urqlState: ssrCache.extractData() },
// 	};
// }

// export default withUrqlClient(
// 	(ssr) => ({
// 		url: "http://localhost:3000/api/graphql",
// 	})
// 	// Cannot specify { ssr: true } here so we don't wrap our component in getInitialProps
// )(Books);
