/**
 * Module dependencies.
 */

let assert = require('assert');
const { localHostOrDomainIs } = require('../').sandbox;

describe('localHostOrDomainIs(host, hostdom)', function() {
	let tests = [
		['www.netscape.com', 'www.netscape.com', true],
		['www', 'www.netscape.com', true],
		['www.mcom.com', 'www.netscape.com', false],
		['home.netscape.com', 'www.netscape.com', false]
	];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function() {
				assert.equal(expected, localHostOrDomainIs(test[0], test[1]));
			}
		);
	});
});
