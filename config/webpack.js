const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {isDev} = require('./enviroments');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const {STATIC_PATH, PROJECT_ROOT_PATH, PROJECT_SRC_PATH, pathsToResolve} = require('./paths');
const rules = require('./webpack-rules');


module.exports = {
	// webpack-dev-server will monitor the code dependency of these entry points
	entry: {
		main: path.resolve(PROJECT_SRC_PATH, './app.tsx'),
	},
	//webpack-dev-server generates the bundle with the 'filename' in memory.
	// It never creates an actual file in the 'path' specified unlike the webpack CLI
	output: {
		path: STATIC_PATH,
		filename: isDev ? '[name].js' : '[name].[hash].production.min.js',
		chunkFilename: isDev ? undefined : 'chunk.[name].[hash].production.min.js',
		publicPath: '/dist/',
	},
	mode: isDev ? 'development' : 'production',
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.css', '.scss', '.styl', '.sass', '.json'],
		modules: [...pathsToResolve, 'node_modules'],

	},
	module: {
		rules,
	},
	devServer: {
		//compress: true,
		port: 9000,
		//webpack-dev-server supports a hot mode in which it tries to update with HMR before trying to reload the whole page
		hot: false,
		historyApiFallback: true,
		https: false,
		// This is where webpack-dev-server serves your bundle, which is created in memory.
		// To use the in-memory bundle, your <script> 'src' should point to the bundle prefixed with the 'publicPath':
		// <script src='http://localhost:9001/assets/bundle.js'></script>

		//Upon code changes, webpack-dev-server generates the bundle file in-memory,
		//so to enjoy ‘live-reload’, you need to ensure that your html page <script> tags
		//are pointing to the in-memory bundle, which is served at url pointed to by publicPath
		publicPath: '/dist/',
		// The local filesystem directory where static html files should be placed.
		contentBase: PROJECT_ROOT_PATH,
		compress: false,
		// To make live-reloading happen even when changes are made to the static html
		watchContentBase: true,
	},
	devtool: isDev ? '#inline-source-map' : false, //map your compiled code back to your original source code
	optimization: isDev ? {} : {
		minimize: true,
		noEmitOnErrors: true,
		mangleWasmImports: true,
		minimizer: [
			new UglifyJSPlugin(),
			new OptimizeCSSAssetsPlugin({})

		],
		runtimeChunk: false,
		splitChunks: isDev ? undefined : {
			chunks: 'initial',
		},
	},
	//A webpack plugin is a JavaScript object that has an apply method.
	//This apply method is called by the webpack compiler, giving access to the entire compilation lifecycle.
	plugins: !isDev ? [
		// eslint-disable-next-line no-useless-escape
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].production.min.css',
		}),
		new BundleAnalyzerPlugin({analyzerPort: 8090}),
	] : [
		new MiniCssExtractPlugin({
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
};
