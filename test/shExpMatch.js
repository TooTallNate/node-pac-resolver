
/**
 * Module dependencies.
 */

var assert = require('assert');
var shExpMatch = require('../shExpMatch');

describe('shExpMatch(str, shexp)', function () {

  var tests = [
    ["http://home.netscape.com/people/ari/index.html", "*/ari/*", true],
    ["http://home.netscape.com/people/montulli/index.html", "*/ari/*", false],
    ["http://home.example.com/people/index.html", ".*/people/.*", true],
    ["http://home.example.com/people/yourpage/index.html", ".*/mypage/.*", false],
    ["www.hotmail.com", "*hotmail.com*", true],
    ["phishing-scam.com?email=someone@hotmail.com", "*hotmail.com*", true]
  ];

  tests.forEach(function (test) {
    var expected = test.pop();
    it('should return `' + expected +'` for "' + test.join('", "') + '"', function (done) {
      shExpMatch.apply(null, test)(function (err, res) {
        if (err) return done(err);
        assert.equal(expected, res);
        done();
      });
    });
  });

});
