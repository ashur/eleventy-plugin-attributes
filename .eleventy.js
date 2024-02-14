const attributes = require( "./src/attributes" );

/* eslint-disable-next-line no-unused-vars */
const UserConfig = require( "@11ty/eleventy/src/UserConfig" );

/**
 * @param {UserConfig} eleventyConfig
 * @param {Object} options
 * @param {string} [options.shortcodeName] - ex., "attr"
 */
module.exports = ( eleventyConfig, options = {} ) =>
{
	const { shortcodeName } = options;
	eleventyConfig.addShortcode( shortcodeName || "attributes", attributes );

	eleventyConfig.addFilter( "testValue", ( value ) => console.log( { value } ) );
};
