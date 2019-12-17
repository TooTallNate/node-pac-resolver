import { GMT } from './index';
import { LookupAddress, LookupOptions, lookup } from 'dns';

export function dnsLookup(
	host: string,
	opts: LookupOptions
): Promise<string | LookupAddress[]> {
	return new Promise((resolve, reject) => {
		lookup(host, opts, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

export function isGMT(v: any): v is GMT {
	return v === 'GMT';
}
