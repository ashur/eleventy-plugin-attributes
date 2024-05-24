# eleventy-plugin-attributes

An Eleventy plugin for conditionally creating HTML element attributes strings:

```njk
{% attributes {
    alt: "",
    "aria-disabled": false,
    async: true,
    class: "green" if false,
    href: undefined,
    required: false
} %}
```

omitting attributes with `null` or `undefined` values:

```
alt="" aria-disabled="false" async
```

## Setup

Run the following command at the root of your Eleventy project

```shell
npm install ashur/eleventy-plugin-attributes#semver:^v1.0.0-beta.2
```

then include it in your `.eleventy.js` config file:

```javascript
const attributes = require("@aaashur/eleventy-plugin-attributes");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(attributes);
};
```

The default shortcode name is `attributes`, but you can customize it using the `shortcodeName` option:

```javascript
const attributes = require("@aaashur/eleventy-plugin-attributes");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(attributes, {
        shortcodeName: "attr",
    });
};
```

## Usage

You might use the shortcode in a [Nunjucks template](https://www.11ty.dev/docs/languages/nunjucks/) like this:

```njk
<div {%- attributes {
    "aria-disabled": false,
    async: true,
    href: undefined
} %}></div>
```

which would result in:

```html
<div aria-disabled="false" async></div>
```

The shortcode also supports a more compact single name-value format, handy when only one attribute needs to be evaluated for truthiness:

```njk
{%- set elementId = "section-2" -%}

<h2 {%- attributes "id", elementId %}>Heading With ID</h2>
<h2 {%- attributes "id", undefinedVar %}>Heading Without ID</h2>
```

```html
<h2 id="section-2">Heading With ID</h2>
<h2>Heading Without ID</h2>
```

### "Truthy-ish" Values

When evaluating attributes, the following values will always result in an attribute being omitted:

- `null`
- `undefined`

while the following values, which are traditionally considered falsy, are treated as "truthy-ish" in the context of HTML attribute values and preserved in the final string:

- `0`
- `""`
- `false`

```njk
{% attributes {
    alt: ""
    "aria-disabled": false,
    height: 0
} %}
```

```
alt="" aria-disabled="false" height="0"
```

[Boolean attributes](https://web.dev/learn/html/attributes/#boolean_attributes) (`async`, `required`, `selected`, etc.) are evaluated using traditional truthy testing, and are omitted if their values are falsy:

```njk
{% attributes {
    "aria-disabled": false,
    async: true,
    required: false
} %}
```

```
aria-disabled="false" async
```

### Attributes with Special Handling

#### class

If an attribute is named `class` and its value is an array, [`classnames`](https://www.npmjs.com/package/@aaashur/eleventy-plugin-classnames) will be used automatically to return a space-delimited string containing only truthy, non-duplicate values:

```njk
<div {%- attributes {
    class: [
        "block",
        "block__element",
        "block__element--modifier" if false,
        "block"
    ]
} %}>
    <p>Hello, world.</p>
</div>
```

```html
<div class="block block__element">
    <p>Hello, world.</p>
</div>
```

#### style

If an attribute is named `style` and its value is an object, [`styles`](https://www.npmjs.com/package/@aaashur/eleventy-plugin-styles) will be used automatically to return a semicolon-delimited string containing only truthy values:

```njk
<div {%- attributes {
    style: {
        "--custom-property": "10px",
        "--false-property": false,
        "--null-property": null,
        "--undefined-property": undefined,
        "background-color": "red"
    }
} %}>
    <p>Hello, world.</p>
</div>
```

```html
<div style="--custom-property: 10px; background-color: red"></div>
    <p>Hello, world.</p>
</div>
```
