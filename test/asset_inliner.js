"use strict";

var fs           = require( "fs" );
var should       = require( "should" );
var AssetInliner = require( "../lib/asset_inliner.js" );

describe( "asset-inliner", function () {

  it( "should throw an error if no callback is provided", function( done ) {
    var assetInliner = new AssetInliner();

    assetInliner.process.bind( "test/fixtures/fixture_with_assets.html" ).should.throw( "No callback provided" );
    done();
  });

  it( "should inline all assets if manual mode is not set", function( done ) {
    var assetInliner = new AssetInliner();

    assetInliner.process( "test/fixtures/fixture.html", function( error, markup ) {
      var expectedMarkup = fs.readFileSync( "test/fixtures/expected.html", "utf8" );

      markup.should.containEql( expectedMarkup );
      done();
    });
  });

  it( "should ONLY inline explicitly defined assets in manual mode", function( done ) {
    var assetInliner = new AssetInliner( { manual: true } );

    assetInliner.process( "test/fixtures/fixture_manual.html", function( error, markup ) {
      var expectedMarkup = fs.readFileSync( "test/fixtures/expected_manual.html", "utf8" );

      markup.should.containEql( expectedMarkup );
      done();
    });
  });

});
