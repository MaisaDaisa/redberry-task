/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-gray-border": "#DBDBDB",
				"primary-text-100": "#021526",
				"primary-text-80": "rgba(2, 21, 38, 0.80)",
				"primary-text-70": "rgba(2, 21, 38, 0.70)",
				"primary-orange": "#F93B1D",
				"primary-orange-hover": "#DF3014",
				"primary-white": "#FFFFFF",
			},
			spacing: {
				//can be changed later by devs
				globalPx: "162px",
			},
		},
	},
	plugins: [],
};
