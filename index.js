
/**
 * Module dependencies.
 */

var co = require('co');
var vm = require('vm');
var compile = require('./compile');
var dnsDomainIs = require('./dnsDomainIs');

/**
 * Module exports.
 */

module.exports = generate;

/**
 * Returns an asyncronous `FindProxyForURL` function from the
 * given JS string (from a PAC file).
 *
 * @param {String} str JS string
 * @return {Function} async resolver function
 */

function generate (str) {

  // convert the JS FindProxyForURL function into
  // a generator function
  var js = compile(str);

  // the sandbox to use for the vm
  // TODO: make configurable
  var sandbox = {
    dnsDomainIs: dnsDomainIs,
    animal: 'cat',
    count: 2
  };

  // filename of the pac file for the vm
  // TODO: make configurable
  var filename = 'proxy.pac';

  // evaluate the JS string and extract the FindProxyForURL generator function
  var FindProxyForURL = vm.runInNewContext(js + ';FindProxyForURL', sandbox, filename);

  // return the async resolver function
  return function (url, host, callback) {
    co(function* () {
      var res = yield FindProxyForURL(url, host);
      return res || 'DIRECT';
    })(callback);
  };
}
