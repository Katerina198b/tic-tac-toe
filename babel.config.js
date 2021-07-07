const BASE_PLUGINS = [
	'@babel/plugin-transform-runtime', //A plugin that enables the re-use of Babel's injected helper code to save on codesize.
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-syntax-dynamic-import',
	'@babel/plugin-proposal-nullish-coalescing-operator', //support of ?? operator
	'@babel/plugin-proposal-optional-chaining', //support of ? operator

];

function getPresetEnvTargetsOption(targetType = 'modern') {
	return ({
		legacy: {
			ie: '11',
		},
		modern: {
			chrome: '67',
		},
		'modern+': {
			chrome: 'last 1 version'
		}
	})[targetType];
}

/**
 * '@babel/preset-env' is a smart preset that allows you to use the latest JavaScript
 * without needing to micromanage which syntax transforms
 **/
function getEnvPreset(targetType) {
	return [
		'@babel/preset-env',
		{
			useBuiltIns: 'entry', //This option configures how @babel/preset-env handles polyfills.
			targets: getPresetEnvTargetsOption(targetType),
			modules: false, //ошибки в легаси бандлах
			corejs: '3.6.5',
		}
	];
}

function getBasePresents(targetType) {
	return [
		getEnvPreset(targetType),
		'@babel/preset-react',
		'@babel/preset-typescript',
	];
}


function getDevelopmentBaseOptions(targetType) {
	return {
		presets: getBasePresents(targetType),
		plugins: BASE_PLUGINS,
	};
}

function getProductionBabelOptions(targetType) {
	return {
		presets: getBasePresents(targetType),
		plugins: [
			...BASE_PLUGINS,
			'@babel/plugin-transform-react-inline-elements',
			'@babel/plugin-transform-react-constant-elements', //hoisting React elements to the highest possible scope
		]
	};
}

function getTestBabelOptions() {
	return {
		presets: [
			'@babel/preset-react',
			'@babel/preset-typescript',
			[
				'@babel/preset-env',
				{
					targets: {node: 'current'}
				},
			]
		],
		plugins: [
			...BASE_PLUGINS,
			'babel-plugin-dynamic-import-node', // https://github.com/facebook/jest/issues/2442
			'babel-plugin-import-remove-resource-query',
		]
	};
}

//Do not cache this config, and re-execute the function every time.
module.exports = api => {
	if (api) {
		api.cache(false);
	}
	const env =  {
		production: getProductionBabelOptions(),
		development: getDevelopmentBaseOptions(),
		test: getTestBabelOptions(),
	};
	return {env};
};
