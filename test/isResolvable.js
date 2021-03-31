/**
 * Module dependencies.
 */

let assert = require('assert');
const { isResolvable } = require('../').sandbox;

describe('isResolvable(host)', function() {
	let tests = [['www.netscape.com', true], ['bogus.domain.foobar', false]];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function(done) {
				isResolvable(test[0]).then(res => {
					assert.equal(expected, res);
					done();
				}, done);
			}
		);
	});
});
