/**
 * Module dependencies.
 */

let assert = require('assert');
let { isInNet } = require('../').sandbox;

describe('isInNet(host, pattern, mask)', function() {
	let tests = [
		['198.95.249.79', '198.95.249.79', '255.255.255.255', true],
		['198.95.249.78', '198.95.249.79', '255.255.255.255', false],
		['198.95.1.1', '198.95.0.0', '255.255.0.0', true],
		['198.94.1.1', '198.95.0.0', '255.255.0.0', false],
		[null, '198.95.0.0', '255.255.0.0', false]
	];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function(done) {
				isInNet(test[0], test[1], test[2]).then(res => {
					assert.equal(expected, res);
					done();
				}, done);
			}
		);
	});
});
