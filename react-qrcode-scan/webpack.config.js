const path = require("path");
const argv = require('minimist')(process.argv.slice(2));

const HTMLWebpackPlugin = require("html-webpack-plugin");

function resolve(filepath) {
	return path.resolve(__dirname, filepath);
}

const dev = !argv.pro;

module.exports = () => {

	return {
		entry: {
			main: resolve("./mount.tsx")
		},
		resolve: {
			extensions: [".webpack.js", ".tsx", ".ts", ".jsx", ".js"],
			modules: ["node_modules"]
		},
		resolveLoader: {
			modules: ["node_modules"]
		},
		devtool: dev ? "source-map" : false,
		mode: dev ? "development" : "production",
		output: {
			filename: "[name].bundle.js",
			path: resolve("./dist/")
		},
		module: {
			rules: [
				{
					test: /.tsx?$/,
					exclude: resolve("node_modules"),
					use: [{ loader: "ts-loader", options: { transpileOnly: true } }]
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: "style-loader"
						},
						{
							loader: "css-loader",
							options: {
								modules: false,
							}
						}
					]
				},
			]
		},
		plugins: [
			new HTMLWebpackPlugin({
				template: path.join(__dirname, "./index.html"),
				inject: "body",
				inlineSource: "runtime~main.*js$"
			})
		],
		devServer: {
			host: "localhost",
			contentBase: path.join(__dirname, "dist"),
			historyApiFallback: true,
			port: 8899,
			open: true
		},
		node: {
			fs: "empty"
		}
	};
};
