
/**
 * Module exports.
 */

module.exports = dnsDomainIs;

/**
 * Returns true iff the domain of hostname matches.
 *
 * @param {String} host is the hostname from the URL.
 * @param {String} domain is the domain name to test the hostname against.
 * @return {Boolean} true iff the domain of the hostname matches.
 */

function* dnsDomainIs (host, domain) {
  host = String(host);
  domain = String(domain);
  return host.substr(domain.length * -1) === domain;
}
