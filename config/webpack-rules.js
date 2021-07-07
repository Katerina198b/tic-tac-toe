const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const svgToMiniDataURI = require('mini-svg-data-uri');

const babelRule = {
	test: /\.(js|jsx|tsx|ts)$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
};

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: false,
		plugins: () => [autoprefixer()],
	},
};

const styleRule = {
	test: /\.(scss|css|sass)$/,
	//Loaders are evaluated/executed from right to left (or from bottom to top)
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				modules: true,
				minimize: true,
				sourceMap: false,
			},
		},
		'css-loader',
		postcssLoader,
		'sass-loader',

	],
	sideEffects: true
};

const stylusRule = {
	test: /\.styl$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				modules: true,
				minimize: true,
				sourceMap: false,
			},
		},
		'css-loader',
		postcssLoader,
		'stylus-loader',

	],
	sideEffects: true
};

const urlLoader = {
	loader: 'url-loader',
	options: {
		name: './images/[name].[hash].[ext]',
		limit: 8192,
	},
};

const imagesRule = {
	test: /\.(png|jpeg|jpg)$/,
	use: urlLoader,
};

const svgImagesRule = {
	test: /\.svg$/,
	oneOf: [
		{
			use: [
				{
					loader: 'url-loader',
					options: {
						generator: (content) => svgToMiniDataURI(content.toString()),
					}
				}
			],
		},
		{
			resourceQuery: /inline/, // foo.css?inline
			use: 'url-loader'
		}
	]
};

const fontRule = {
	test: /\.(ttf|eot|woff|woff2)$/,
	use: urlLoader,
};

//Out of the box, webpack only understands JavaScript and JSON files.
module.exports = [fontRule, imagesRule, stylusRule, styleRule, babelRule, svgImagesRule];
