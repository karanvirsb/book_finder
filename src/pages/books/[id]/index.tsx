import { type GetServerSidePropsContext } from "next";
import React from "react";
import {
	cacheExchange,
	dedupExchange,
	fetchExchange,
	ssrExchange,
	useQuery,
} from "urql";
import {
	GetABookDocument,
	type GetABookQuery,
	type GetABookQueryVariables,
} from "../../../generated/graphql";
import { initUrqlClient, withUrqlClient, type SSRData } from "next-urql";
import { useRouter } from "next/router";

function BookDetails(): JSX.Element {
	const router = useRouter();
	const bookId = router.query.id as string;
	const [book] = useQuery<GetABookQuery, GetABookQueryVariables>({
		query: GetABookDocument,
		variables: { getABookId: bookId },
	});
	return <pre>{JSON.stringify(book, null, 2)}</pre>;
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext
): Promise<{
	props: {
		urqlState: SSRData;
	};
}> {
	const { id } = ctx.params as any;

	const ssrCache = ssrExchange({ isClient: false });
	const client = initUrqlClient(
		{
			url: "http://localhost:3000/api/graphql", // not needed without `fetchExchange`
			exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
		},
		false
	);

	await client
		?.query<GetABookQuery, GetABookQueryVariables>(GetABookDocument, {
			getABookId: id,
		})
		.toPromise();

	return {
		props: {
			urqlState: ssrCache.extractData(),
		},
	};
}

export default withUrqlClient((ssr) => ({
	url: "http://localhost:3000/api/graphql",
}))(BookDetails);
