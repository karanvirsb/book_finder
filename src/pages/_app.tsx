import "../styles/globals.css";
import { Provider } from "urql";
import client from "../urql";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<Component {...pageProps} />;
		</Provider>
	);
}
