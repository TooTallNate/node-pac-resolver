/**
 * Module dependencies.
 */

let assert = require('assert');
let { shExpMatch } = require('../').sandbox;

describe('shExpMatch(str, shexp)', function() {
	let tests = [
		['http://home.netscape.com/people/ari/index.html', '*/ari/*', true],
		[
			'http://home.netscape.com/people/montulli/index.html',
			'*/ari/*',
			false
		],
		[
			'http://home.example.com/people/yourpage/index.html',
			'.*/mypage/.*',
			false
		],
		['www.hotmail.com', '*hotmail.com*', true],
		['phishing-scam.com?email=someone@hotmail.com', '*hotmail.com*', true],
		['abcdomain.com', '(*.abcdomain.com|abcdomain.com)', true],
		['foo.abcdomain.com', '(*.abcdomain.com|abcdomain.com)', true],
		['abddomain.com', '(*.abcdomain.com|abcdomain.com)', false],
		['abcdomain.com', '*.n.com', false],
		['a.com', '?.com', true],
		['b.com', '?.com', true],
		['ab.com', '?.com', false]
	];

	tests.forEach(function(test) {
		let expected = test.pop();
		it(
			`should return \`${  expected  }\` for "${  test.join('", "')  }"`,
			function() {
				assert.equal(expected, shExpMatch(test[0], test[1]));
			}
		);
	});
});
