
/**
 * Module dependencies.
 */

var assert = require('assert');
var weekdayRange = require('../weekdayRange');

describe('weekdayRange(wd1, wd2, gmt)', function () {

  var tests = [
  ];

  tests.forEach(function (test) {
    var expected = test.pop();
    it('should return `' + expected +'` for "' + test.join('", "') + '"', function (done) {
      weekdayRange.apply(null, test)(function (err, res) {
        if (err) return done(err);
        assert.equal(expected, res);
        done();
      });
    });
  });

});
