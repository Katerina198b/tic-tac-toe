const path = require('path');
const PROJECT_ROOT_PATH = path.resolve(__dirname, '../');
const PROJECT_SRC_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const STATIC_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist');

const pathsToResolve = [
	path.resolve(PROJECT_ROOT_PATH, './src'),
];

module.exports = {
	PROJECT_ROOT_PATH,
	STATIC_PATH,
	PROJECT_SRC_PATH,
	pathsToResolve,
};
