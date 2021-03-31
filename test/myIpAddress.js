/**
 * Module dependencies.
 */

let isIP = require('net').isIP;
let assert = require('assert');
let { myIpAddress } = require('../').sandbox;

describe('myIpAddress()', function() {
	it('should return an IPv4 address', function(done) {
		myIpAddress().then(ip => {
			assert.equal(4, isIP(ip));
			done();
		}, done);
	});
});
