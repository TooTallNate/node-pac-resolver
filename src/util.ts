import { Resolver, LookupAddress, LookupOptions, lookup } from 'dns';
import { GMT } from './index';

export function resolveDNS(
	host: string
): Promise<string[]> {
	const resolver = new Resolver();
	if(process.env.CUSTOM_DNS_SERVER) {
		let currentDNSservers = resolver.getServers();
		resolver.setServers([process.env.CUSTOM_DNS_SERVER, ...currentDNSservers]);
	}

	return new Promise((resolve, reject) => {
		resolver.resolve4(host, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

export function lookupDNS(
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
