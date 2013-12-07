
/**
 * Module dependencies.
 */

var assert = require('assert');
var isPlainHostName = require('../isPlainHostName');

describe('isPlainHostName(host)', function () {

  var tests = [
   ["www", true],
   ["www.netscape.com", false]
  ];

  tests.forEach(function (test) {
    var expected = test.pop();
    it('should return `' + expected +'` for "' + test.join('", "') + '"', function (done) {
      isPlainHostName.apply(null, test)(function (err, res) {
        if (err) return done(err);
        assert.equal(expected, res);
        done();
      });
    });
  });

});
