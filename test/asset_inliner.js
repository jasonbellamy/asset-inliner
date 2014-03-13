"use strict";

var fs           = require( "fs" );
var should       = require( "should" );
var AssetInliner = require( "../lib/asset_inliner.js" );

describe( "asset-inliner", function () {

  before( function () {
    this.assetInliner = new AssetInliner( { stylesheets: true, javascripts: true } );
  });

  it( "should throw an error if no callback is provided", function( done ) {
    this.assetInliner.process.bind( "test/fixtures/fixture_with_assets.html" ).should.throw( "No callback provided" );
    done();
  });

  it( "should return markup with the assets inlined", function( done ) {
    this.assetInliner.process( "test/fixtures/fixture_with_assets.html", function( error, markup ) {
      var compiledMarkup = fs.readFileSync( "test/fixtures/expected.html", "utf8");
      markup.should.containEql( compiledMarkup );
      done();
    });
  });

});
