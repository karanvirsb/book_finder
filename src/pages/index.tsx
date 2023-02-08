import { gql } from "@urql/core";
import { useEffect, useState } from "react";
import client from "../urql";
const QUERY = gql`
	query Test {
		getHelloWorld
	}
`;

interface testData {
	getHelloWorld: "Hello World";
}
export default function Home(): JSX.Element {
	const [data, setData] = useState("");

	useEffect(() => {
		function fetchData(): void {
			client
				.query(QUERY, {})
				.toPromise()
				.then((data) => {
					const resp: testData = data.data;
					setData(resp.getHelloWorld);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		fetchData();
	}, []);

	return (
		<>
			<div className="text-red-300 text-lg">{data}</div>
		</>
	);
}
