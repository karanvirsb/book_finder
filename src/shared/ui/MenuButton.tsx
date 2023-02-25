interface menuButtonProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MenuButton({
	isMenuOpen,
	setIsMenuOpen,
}: menuButtonProps): JSX.Element {
	return (
		<button
			className="fixed right-2 bottom-2 z-50 rounded-full bg-tertiary p-4 text-primary opacity-60 drop-shadow-md sm:hidden"
			onClick={() => {
				setIsMenuOpen((prev) => !prev);
			}}
		>
			{isMenuOpen ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			)}
		</button>
	);
}
