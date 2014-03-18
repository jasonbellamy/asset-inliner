/*
 * asset-inliner
 * Parses your markup and replaces the references to external assets with inline code.
 *
 * https://github.com/jasonbellamy/asset-inliner
 *
 * Copyright (c) 2014 Jason Bellamy
 * Licensed under the MIT license.
 */
'use strict';

var fs        = require( "fs" );
var path      = require( "path" );
var jsdom     = require( "jsdom" );
var assetment = require( "assetment" );
var merge     = require( "lodash-node/modern/objects/merge" );

/**
 * Parses your markup and replaces the references to external assets with inline code.
 * @constructor
 * @param {Object} [options] - Defines the configuration options.
 * @param {boolean} [options.manual=false]- Manually define the assets that should be inlined.
 */
var AssetInliner = function( options ) {

  if ( !( this instanceof AssetInliner ) ) {
    return new AssetInliner( options );
  }

  this.options = Object.create( null, {
    manual: { value: false, enumerable: true, writable: true }
  });

  merge( Object.preventExtensions( this.options ), options );

  this.types = Object.create( null, {
    stylesheets: {
      value: { element: "style" },
      enumerable: true
    },
    javascripts: {
      value: { element: "script" },
      enumerable: true
    }
  });
};

AssetInliner.prototype = {

  constructor: AssetInliner,

  /**
   * Start processing the markup and execute the callback on completion.
   * @function
   * @param {string} filePath - The path to the markup file to be parsed.
   * @param {AssetInliner.processCallback} callback - The callback that handles the formatted markup.
   */
  process: function( filePath, callback ) {
    if ( typeof callback !== "function" ) { throw new Error( "No callback provided" ); }

    this.path   = filePath;
    this.file   = fs.readFileSync( this.path, "utf8" );
    this.dom    = jsdom.jsdom( this.file ).parentWindow;
    this.assets = assetment( this.file, { javascripts: true, stylesheets: true });

    try {
      /**
       * The callback that handles the formatted markup.
       * @callback AssetInliner.processCallback
       * @param {Error} error - Any errors that may have occured.
       * @param {string} markup - The updated markup with the assets inlined.
       */
      callback.apply( callback, [ null, this.parse() ] );
    } catch( error ) {
      callback.apply( callback, [ error ] );
    }
  },

  /**
   * Parses the files markup and returns a new copy with the assets inlined.
   * @function
   * @private
   * @returns {string} The updated markup with the assets inlined
   */
  parse: function () {
    Object.keys( this.assets ).forEach( function( type, index ) {
      this.assets[ type ].forEach( function( asset ) {
        if ( this.shouldParse( asset ) ) {
          this.updateDOMWith( asset, type );
        }
      }.bind( this ));
    }.bind( this ));

    return ( this.dom.document.doctype + this.dom.document.innerHTML );
  },

  /**
   * Checks if we should parse and inline the current asset.
   * @function
   * @private
   * @param {Object} asset - Reference to an assets and all of its attributes.
   * @returns {boolean}
   */
  shouldParse: function( asset ) {
    if ( this.options.manual ) {
      return ( "data-inline" in asset.attributes ) || asset.attributes[ "data-inline" ] === "true";
    }

    return true;
  },

  /**
   * Updates the markups external assets with inline styles.
   * @function
   * @private
   * @param {Object} asset - Reference to an assets and all of its attributes.
   * @param {string} type - The type of asset.
   */
  updateDOMWith: function( asset, type ) {
    var tag     = this.dom.document.createElement( this.types[ type ].element );
    var element = this.dom.document.querySelectorAll( this.getSelectorFrom( asset ) )[0];

    tag.innerHTML = fs.readFileSync( path.resolve( path.dirname( this.path ), asset.resource ), "utf8" );
    element.parentNode.replaceChild( tag, element );
  },

  /**
   * Builds a dom selector from the provided asset object.
   * @function
   * @private
   * @param {Object} asset - Reference to an assets and all of its attributes.
   * @returns {string} A fully formed css selector.
   */
  getSelectorFrom: function( asset ) {
    var selector = null;
    Object.getOwnPropertyNames( asset.attributes ).forEach( function( property ) {
      if( asset.attributes[ property ] === asset.resource ) {
        selector = "[" + property + "='" + asset.attributes[ property ] + "']";
      }
    });
    return selector;
  }
};

module.exports = AssetInliner;
