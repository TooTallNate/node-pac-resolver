
/**
 * Module dependencies.
 */

var os = require('os');

/**
 * Module exports.
 */

module.exports = myIpAddress;

/**
 * Returns the IP address of the host that the Navigator is running on, as
 * a string in the dot-separated integer format.
 *
 * Example:
 *
 * ``` js
 * myIpAddress()
 *   // would return the string "198.95.249.79" if you were running the
 *   // Navigator on that host.
 * ```
 *
 * @return {String} external IP address
 */

function myIpAddress () {
  return function (fn) {
    // TODO: make more bulletproof
    console.error(JSON.stringify(os.networkInterfaces(), null, 2));
    var ni = os.networkInterfaces().en0;
    ni = ni.filter(function (n) { return n.family == 'IPv4'; })[0];
    if (ni) {
      fn(null, ni.address);
    } else {
      fn(new Error('could not determine IP Address of external network interface'));
    }
  };
}
