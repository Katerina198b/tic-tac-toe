const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const {ECMA} = process.env;
module.exports = {
	isDev,
	isEsLegady: ECMA === 'legacy',
	idEsAll: ECMA === 'both',
};
