
/**
 * Module dependencies.
 */

var assert = require('assert');
var dnsDomainIs = require('../dnsDomainIs');

describe('dnsDomainIs(host, domain)', function () {

  var tests = [
    ["www.netscape.com", ".netscape.com", true],
    ["www", ".netscape.com", false],
    ["www.mcom.com", ".netscape.com", false]
  ];

  tests.forEach(function (test) {
    var expected = test.pop();
    it('should return `' + expected +'` for "' + test.join('", "') + '"', function (done) {
      dnsDomainIs.apply(null, test)(function (err, res) {
        if (err) return done(err);
        assert.equal(expected, res);
        done();
      });
    });
  });

});
