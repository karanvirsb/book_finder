import { createClient } from "urql";

const client = createClient({
	url: "http://localhost:3000/api/graphql",
});

export default client;
