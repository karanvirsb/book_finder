import { useEffect, useState } from "react";

export default function useGetScreenParameters(): {
	width: number;
	height: number;
} {
	const [windowParams, setWindowParams] = useState({ width: 0, height: 0 });
	useEffect(() => {
		window.addEventListener("resize", handleChange);
		return () => {
			window.removeEventListener("resize", handleChange);
		};
	}, []);

	function handleChange(e: Event): void {
		setWindowParams((prev) => {
			return {
				...prev,
				height: window.screen.height,
				width: window.screen.width,
			};
		});
	}

	return windowParams;
}
