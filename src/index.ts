import { parse } from 'url';
import { Context } from 'vm';
import { CompileOptions, compile } from 'degenerator';

/**
 * Built-in PAC functions.
 */
import dateRange from './dateRange';
import dnsDomainIs from './dnsDomainIs';
import dnsDomainLevels from './dnsDomainLevels';
import dnsResolve from './dnsResolve';
import isInNet from './isInNet';
import isPlainHostName from './isPlainHostName';
import isResolvable from './isResolvable';
import localHostOrDomainIs from './localHostOrDomainIs';
import myIpAddress from './myIpAddress';
import shExpMatch from './shExpMatch';
import timeRange from './timeRange';
import weekdayRange from './weekdayRange';

/**
 * Returns an asynchronous `FindProxyForURL()` function
 * from the given JS string (from a PAC file).
 *
 * @param {String} str JS string
 * @param {Object} opts optional "options" object
 * @return {Function} async resolver function
 */
function createPacResolver(
	_str: string | Buffer,
	_opts: createPacResolver.PacResolverOptions = {}
) {
	const str = Buffer.isBuffer(_str) ? _str.toString('utf8') : _str;

	// The sandbox to use for the `vm` context.
	const sandbox: Context = {
		...createPacResolver.sandbox,
		..._opts.sandbox,
	};

	const opts: createPacResolver.PacResolverOptions = {
		filename: 'proxy.pac',
		..._opts,
		sandbox,
	};

	// Construct the array of async function names to add `await` calls to.
	const names = Object.keys(sandbox).filter((k) =>
		isAsyncFunction(sandbox[k])
	);

	// Compile the JS `FindProxyForURL()` function into an async function.
	const resolver = compile<string, [url: string, host: string]>(
		str,
		'FindProxyForURL',
		names,
		opts
	);

	/* eslint-disable @typescript-eslint/naming-convention, no-redeclare */
	function FindProxyForURL(url: string, host?: string): Promise<string>;
	function FindProxyForURL(
		url: string,
		callback: createPacResolver.FindProxyForURLCallback
	): void;
	function FindProxyForURL(
		url: string,
		host: string,
		callback: createPacResolver.FindProxyForURLCallback
	): void;
	function FindProxyForURL(
		url: string,
		_host?: string | createPacResolver.FindProxyForURLCallback,
		_callback?: createPacResolver.FindProxyForURLCallback
	): Promise<string> | void {
		let host: string | null = null;
		let callback: createPacResolver.FindProxyForURLCallback | null = null;

		if (typeof _callback === 'function') {
			callback = _callback;
		}

		if (typeof _host === 'string') {
			host = _host;
		} else if (typeof _host === 'function') {
			callback = _host;
		}

		if (!host) {
			host = parse(url).hostname;
		}

		if (!host) {
			throw new TypeError('Could not determine `host`');
		}

		const promise = resolver(url, host);

		if (typeof callback === 'function') {
			toCallback(promise, callback);
		} else {
			return promise;
		}
	}

	Object.defineProperty(FindProxyForURL, 'toString', {
		value: () => resolver.toString(),
		enumerable: false,
	});

	return FindProxyForURL;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace createPacResolver {
	export type GMT = 'GMT';
	export type Hour =
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21
		| 22
		| 23;
	export type Day =
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21
		| 22
		| 23
		| 24
		| 25
		| 26
		| 27
		| 28
		| 29
		| 30
		| 31;
	export type Weekday = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
	export type Month =
		| 'JAN'
		| 'FEB'
		| 'MAR'
		| 'APR'
		| 'MAY'
		| 'JUN'
		| 'JUL'
		| 'AUG'
		| 'SEP'
		| 'OCT'
		| 'NOV'
		| 'DEC';
	export interface PacResolverOptions extends CompileOptions {}
	export interface FindProxyForURLCallback {
		(err?: Error | null, result?: string): void;
	}
	export type FindProxyForURL = ReturnType<typeof createPacResolver>;
	export const sandbox: Readonly<Context> = Object.freeze({
		alert: (message = '') => console.log('%s', message),
		dateRange,
		dnsDomainIs,
		dnsDomainLevels,
		dnsResolve,
		isInNet,
		isPlainHostName,
		isResolvable,
		localHostOrDomainIs,
		myIpAddress,
		shExpMatch,
		timeRange,
		weekdayRange,
	});
}
export = createPacResolver;

function toCallback<T>(
	promise: Promise<T>,
	callback: (err: Error | null, result?: T) => void
): void {
	promise.then((rtn) => callback(null, rtn), callback);
}

function isAsyncFunction(v: any): boolean {
	if (typeof v !== 'function') return false;
	// Native `AsyncFunction`
	if (v.constructor.name === 'AsyncFunction') return true;
	// TypeScript compiled
	if (String(v).indexOf('__awaiter(') !== -1) return true;
	// Legacy behavior - set `async` property on the function
	return Boolean(v.async);
}
