const attributes = require( "./src/attributes" );

/* eslint-disable-next-line valid-jsdoc */
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @param {Object} options
 * @param {string} [options.shortcodeName] - ex., "attr"
 */
module.exports = ( eleventyConfig, options = {} ) =>
{
	const { shortcodeName } = options;
	eleventyConfig.addShortcode( shortcodeName || "attributes", attributes );
};
