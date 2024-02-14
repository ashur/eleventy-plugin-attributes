const classnames = require( "@aaashur/eleventy-plugin-classnames/src/classnames" );
const styles = require( "@aaashur/eleventy-plugin-styles/src/styles" );

/**
 * @typedef {boolean|number|string} AttributeValue
 */

/*
 * Values from https://html.spec.whatwg.org/multipage/indices.html#attributes-3
 * via https://meiert.com/en/blog/boolean-attributes-of-html/
 */
const booleanAttributes = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"inert",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"selected",
];

/**
 * @example
 * attributes("href", "https://example.com")
 * // returns 'href="https://example.com"'
 *
 * @example
 * attributes("href", "")
 * // returns 'href="https://example.com"'
 *
 * @param {string|Object<string, AttributeValue>} arg1 - a single attribute name, or an object defining attribute names and values
 * @param {AttributeValue} [value] - a single attribute value
 * @return {string}
 */
module.exports = ( arg1, value ) =>
{
	if( typeof arg1 === "string" )
	{
		const name = arg1;
		return getAttributeString( name, value );
	}
	else if ( isObject( arg1 ) )
	{
		return Object.entries( arg1 )
			.map( ( [name, value] ) => getAttributeString( name, value ) )
			.filter( ( element ) => element )
			.join( " " );
	}

	return "";
};

/**
 * @param {string} name
 * @param {AttributeValue} value
 * @return {string}
 */
function getAttributeString( name, value )
{
	if( booleanAttributes.includes( name ) )
	{
		return value ? name : "";
	}
	else
	{
		// Attributes with special handling
		if ( name === "class" && Array.isArray( value ) )
		{
			value = classnames( ...value ) || null; // convert `""` to `null` to force return of empty attribute string
		}

		if ( name === "style" && isObject( value ) )
		{
			value = styles( value ) || null; // convert `""` to `null` to force return of empty attribute string
		}

		// All other attributes
		if( !isTruthyish( value ) )
		{
			return "";
		}

		return `${name}="${value}"`;
	}
}

/**
 * @param {any} value
 * @return {boolean}
 */
function isObject( value )
{
	return Object.prototype.toString.call( value ) === "[object Object]";
}

/**
 * Test for a subset of truthiness
 * @param {any} value
 * @return {boolean}
 */
function isTruthyish( value )
{
	if( Array.isArray( value ) )
	{
		return value.length;
	}

	return value !== null && value !== undefined;
}
