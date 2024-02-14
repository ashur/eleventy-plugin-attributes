/* global describe, it */
const attributes = require( "../src/attributes" );
const { assert } = require( "chai" );

describe( "attributes", () =>
{
	it( "should return empty string if the first argument is not a string or an object", () =>
	{
		assert.equal( attributes( [] ), "" );
		assert.equal( attributes( false ), "" );
		assert.equal( attributes( null ), "" );
		assert.equal( attributes( true ), "" );
		assert.equal( attributes( undefined ), "" );
	} );

	it( "should return a single-attribute string if the first argument is a string", () =>
	{
		assert.equal( attributes( "aria-disabled", false ), "aria-disabled=\"false\"" );
		assert.equal( attributes( "data-empty-value", [] ), "" );
		assert.equal( attributes( "data-null-value", null ), "" );
		assert.equal( attributes( "data-undefined-value", undefined ), "" );
		assert.equal( attributes( "height", 0 ), "height=\"0\"" );
		assert.equal( attributes( "href", "https://example.com" ), "href=\"https://example.com\"" );
	} );

	it( "should return a space-delimited attribute string if the first argument is an object", () =>
	{
		/* eslint-disable quote-props */
		assert.equal( attributes( {
			"alt": "",
			"aria-disabled": false,
			"data-empty-value": [],
			"data-null-value": null,
			"data-undefined-value": undefined,
			"href": "https://example.com",
		} ), "alt=\"\" aria-disabled=\"false\" href=\"https://example.com\"" );
		/* eslint-enable quote-props */
	} );

	it( "should return valid strings for boolean attributes", () =>
	{
		assert.equal( attributes( "allowfullscreen", false ), "" );
		assert.equal( attributes( "allowfullscreen", true ), "allowfullscreen" );

		/* eslint-disable quote-props */
		assert.equal( attributes( {
			"allowfullscreen": true,
			"async": false,
			"class": "classString", // Not a boolean attribute :)
			"disabled": "true",
		} ), "allowfullscreen class=\"classString\" disabled" );
		/* eslint-enable quote-props */
	} );

	it.skip( "should use classnames if attribute name is 'class'", () =>
	{
		assert.equal( attributes( "class", [
			"block",
			"block__element",
			false && "block__element--modifier",
			"block",
		] ), "class=\"block block__element\"" );
	} );
} );
