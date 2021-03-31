import { resolveDNS } from './util';

/**
 * Tries to resolve the hostname. Returns true if succeeds.
 *
 * @param {String} host is the hostname from the URL.
 * @return {Boolean}
 */

export default async function isResolvable(host: string): Promise<boolean> {
	try {
		if (await resolveDNS(host)) {
			return true;
		}
	} catch (err) {
		// ignore
	}
	return false;
}
