# asset-inliner [![Build Status](https://travis-ci.org/jasonbellamy/asset-inliner.png?branch=master)](https://travis-ci.org/jasonbellamy/asset-inliner)

> Parses your markup and replaces the references to external assets with inline code.

## Features
[asset-inliner](https://github.com/jasonbellamy/asset-inliner/) helps you optimize your pages by giving you the option to:

- automatically inline all stylesheet & JavaScript files it finds in your markup.
- [manually](#new-assetinliner-options-) inline **only** the files you choose by appending `data-inline="true"` to the element(s) markup.


## Getting Started

```
npm install --save asset-inliner
```


## Usage

```javascript
var AssetInliner = require( "asset-inliner" );
var assetInliner = new AssetInliner();

assetInliner.process( "markup.html", function( error, markup ) {
  if ( error ) {
    console.log( error );
    return;
  }
  
  console.log( markup ); // markup with the stylesheets & javascripts inlined.
});
```


## API

### new AssetInliner( options )

Name                | Type      | Argument     | Default | Description
--------------------|-----------|--------------|---------|------------
options             | `Object`  | `<optional>` |         | Configuration options.
options.manual      | `boolean` | `<optional>` | `false` | Manually define the assets that should be inlined.

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
