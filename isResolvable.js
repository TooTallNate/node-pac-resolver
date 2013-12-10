
/**
 * Module dependencies.
 */

var dns = require('dns');

/**
 * Module exports.
 */

module.exports = isResolvable;

/**
 * Tries to resolve the hostname. Returns true if succeeds.
 *
 * @param {String} host is the hostname from the URL.
 * @return {Boolean}
 */

function isResolvable (host) {
  return function (fn) {
    var family = 4;
    dns.lookup(host, family, function (err, ip) {
      fn(null, !err);
    });
  };
}
