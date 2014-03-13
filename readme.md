# asset-inliner [![Build Status](https://travis-ci.org/jasonbellamy/asset-inliner.png?branch=master)](https://travis-ci.org/jasonbellamy/asset-inliner)

> Parses your markup and replaces the references to external assets with inline code.

## Features
[asset-inliner](https://github.com/jasonbellamy/asset-inliner/) helps you optimize your pages by giving you the option to:

- inline any JavaScript files it finds in your markup.
- inline any stylesheet files it finds in your markup.

## Getting Started

```
npm install --save asset-inliner
```


## Usage

```javascript
var AssetInliner = require( "asset-inliner" );
var assetInliner = new AssetInliner( { javascripts: true, stylesheets: true } );

assetInliner.process( "markup.html", function( error, markup ) {
  if ( error ) {
    console.log( error );
    return;
  }
  
  console.log( markup ); // markup with the stylesheets & javascripts inlined.
});
```

## API

### new AssetInliner( filters )

Name                | Type      | Argument     | Default | Description
--------------------|-----------|--------------|---------|------------
filters             | `Object`  | `<required>` |         | Types of assets you want to extract.
filters.javascripts | `boolean` | `<optional>` | `false` | Inline JavaScript files.
filters.stylesheets | `boolean` | `<optional>` | `false` | Inline stylesheet files.

### AssetInliner.process( filePath, callback )

Name     | Type       | Argument     | Description
---------|------------|--------------|------------
filePath | `string`   | `<required>` | The path to the markup file to be parsed.
callback | `function` | `<required>` | The callback that handles the formatted markup.

#### callback( error, markup )

Name     | Type       | Argument     | Description
---------|------------|--------------|------------
error    | `Error`    | `<required>` | Any errors that may have occured.
markup   | `string`   | `<required>` | The updated markup with the assets inlined


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## License
Copyright (c) 2014 [Jason Bellamy ](http://jasonbellamy.com)  
Licensed under the MIT license.
