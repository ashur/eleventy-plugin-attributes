module.exports = {
	extends: "@aaashur/eslint-config",
	rules: {
		"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		"valid-jsdoc": ["error", {
			prefer: {
				returns: "return",
			},
			requireParamDescription: false,
			requireReturn: false,
			requireReturnDescription: false,
		}],
	},
};
