/**
 * Module dependencies.
 */

let assert = require('assert');
let { dnsDomainLevels } = require('../').sandbox;

describe('dnsDomainLevels(host)', function() {
	let tests = [['www', 0], ['www.netscape', 1], ['www.netscape.com', 2]];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function() {
				assert.equal(expected, dnsDomainLevels(test[0]));
			}
		);
	});
});
