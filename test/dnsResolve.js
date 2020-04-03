/**
 * Module dependencies.
 */

let isIP = require('net').isIP;
let assert = require('assert');
let { dnsResolve } = require('../').sandbox;

describe('dnsResolve(host)', function() {
	let tests = [['www.netscape.com', true], ['bogus.domain.foobar', false]];

	tests.forEach(function(test) {
		let expected = test.pop();
		if (expected) {
			it(
				`should resolve an IPv4 address for "${
					test.join('", "')
					}"`,
				function(done) {
					dnsResolve(test[0]).then(res => {
						assert.equal('string', typeof res);
						assert.equal(4, isIP(res));
						done();
					}, done);
				}
			);
		} else {
			it(
				`should return null for if can't be resolved "${
					test.join('", "')
					}"`,
				function(done) {
					dnsResolve(test[0]).then(res => {
						assert.equal(null, res);
						done();
					}, done);
				}
			);
		}
	});
});
