
/**
 * Module dependencies.
 */

var pac = require('../');
var assert = require('assert');

describe('FindProxyForURL', function () {

  it('should return "DIRECT" by default', function (done) {
    var FindProxyForURL = pac(
      'function FindProxyForURL (url, host) {' +
      '  /* noop */' +
      '}'
    );
    FindProxyForURL('http://foo.com/', 'foo.com', function (err, res) {
      if (err) return done(err);
      assert.equal('DIRECT', res);
      done();
    });
  });

  it('should return the value that gets returned', function (done) {
    var FindProxyForURL = pac(
      'function FindProxyForURL (url, host) {' +
      '  return { foo: "bar" };' +
      '}'
    );
    FindProxyForURL('http://foo.com/', 'foo.com', function (err, res) {
      if (err) return done(err);
      assert.deepEqual({ foo: 'bar' }, res);
      done();
    });
  });

});
