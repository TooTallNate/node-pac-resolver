/**
 * Module dependencies.
 */

let assert = require('assert');
let { isPlainHostName } = require('../').sandbox;

describe('isPlainHostName(host)', function() {
	let tests = [['www', true], ['www.netscape.com', false]];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function() {
				assert.equal(expected, isPlainHostName(test[0]));
			}
		);
	});
});
