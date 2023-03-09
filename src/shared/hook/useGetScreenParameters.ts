import { useEffect, useState } from "react";

export default function useGetScreenParameters(): readonly [number, number] {
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
				height: window.innerHeight,
				width: window.innerWidth,
			};
		});
	}

	return [windowParams.width, windowParams.height] as const;
}
