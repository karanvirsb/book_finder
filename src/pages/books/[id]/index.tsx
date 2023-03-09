import { type GetServerSidePropsContext } from "next";
import { withUrqlClient, initUrqlClient, type SSRData } from "next-urql";
import React from "react";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

function BookDetails(): JSX.Element {
	return <div>BookDetails</div>;
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext
): Promise<{
	props: {
		urqlState: SSRData;
	};
}> {
	const ssrCache = ssrExchange({ isClient: false });
	const client = initUrqlClient(
		{
			url: "http://localhost:3000/api/graphql", // not needed without `fetchExchange`
			exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
		},
		false
	);

	await client?.query(TODOS_QUERY).toPromise();

	return {
		props: {
			urqlState: ssrCache.extractData(),
		},
	};
}

export default withUrqlClient((ssr) => ({
	url: "your-url",
}))(BookDetails);
