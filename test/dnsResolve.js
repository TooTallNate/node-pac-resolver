/**
 * Module dependencies.
 */

let isIP = require('net').isIP;
let assert = require('assert');
let { getServers, setServers } = require('dns');
let dns2 = require('dns2');
let { dnsResolve } = require('../').sandbox;

describe('dnsResolve(host)', function () {
	let tests = [['www.netscape.com', true], ['bogus.domain.foobar', false]];

	tests.forEach(function (test) {
		let expected = test.pop();
		if (expected) {
			it(
				`should resolve an IPv4 address for "${
				test.join('", "')
				}"`,
				function (done) {
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
				function (done) {
					dnsResolve(test[0]).then(res => {
						assert.equal(null, res);
						done();
					}, done);
				}
			);
		}
	});

	it('Should resolve DNS via custom DNS Server', async function () {
		let currentDNSservers = getServers();

		// try to load custom dns server via index.ts
		process.env.CUSTOM_DNS_SERVER = '127.0.0.1:5354';
		let { dnsResolve } = require('../').sandbox;

		const server = dns2.createServer(function (request, send) {

			const response = new dns2.Packet(request);

			response.header.qr = 1;
			response.answers.push({
				name: 'example.test',
				address: '1.2.3.4',
				type: dns2.Packet.TYPE.A,
				class: dns2.Packet.CLASS.IN
			});

			send(response);
		}).listen(5354);

		// does not contain custom dns server
		console.log(getServers());

		let ip = await dnsResolve('example.test');
		assert.equal(ip, '1.2.3.4');

		server.close();

		// reset original dns servers
		setServers(currentDNSservers);
	});
});
