import { createClient } from "@urql/core";

const client = createClient({
	url: "http://localhost:3000/api/graphql",
});

export default client;
