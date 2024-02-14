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
	else if ( Object.prototype.toString.call( arg1 ) === "[object Object]" )
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
		if( !isTruthyish( value ) )
		{
			return "";
		}

		return `${name}="${value}"`;
	}
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
