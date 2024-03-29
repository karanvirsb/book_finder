/** @type {import('tailwindcss').Config} */
const { Tokens } = require("./.mirrorful/theme_cjs.js");
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#FDF3E9",
				secondary: "#262020",
				tertiary: "#347596",
				primary_accent: "#F50063",
				...Tokens.colors,
			},
			backgroundImage: {
				"books-background": "url('/bg-images/book_background.svg')",
			},
		},
	},
	plugins: [],
};
