
/**
 * Module dependencies.
 */

var dns = require('dns');

/**
 * Module exports.
 */

module.exports = dnsResolve;

/**
 * Resolves the given DNS hostname into an IP address, and returns it in the dot
 * separated format as a string.
 *
 * Example:
 *
 * ``` js
 * dnsResolve("home.netscape.com")
 *   // returns the string "198.95.249.79".
 * ```
 *
 * @param {String} host hostname to resolve
 * @return {String} resolved IP address
 */

function dnsResolve (host) {
  return function (fn) {
    dns.resolve(host, fn);
  };
}
