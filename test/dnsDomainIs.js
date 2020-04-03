/**
 * Module dependencies.
 */

let assert = require('assert');
const { dnsDomainIs } = require('../').sandbox;

describe('dnsDomainIs(host, domain)', function() {
	let tests = [
		['www.netscape.com', '.netscape.com', true],
		['www', '.netscape.com', false],
		['www.mcom.com', '.netscape.com', false]
	];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function() {
				assert.equal(expected, dnsDomainIs(test[0], test[1]));
			}
		);
	});
});
