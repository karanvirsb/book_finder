import "../styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import client from "../urql";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<main className={inter.className}>
				<Component {...pageProps} />
			</main>
		</Provider>
	);
}
