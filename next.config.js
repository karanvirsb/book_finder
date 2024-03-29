/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images-na.ssl-images-amazon.com",
				port: "",
				pathname: "/images/**",
			},
		],
		domains: ["images-na.ssl-images-amazon.com"],
	},
};

module.exports = nextConfig;
