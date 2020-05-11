import ip from 'ip';
import net from 'net';
import {getServers} from 'dns';


/**
 * Returns the IP address of the host that the Navigator is running on, as
 * a string in the dot-separated integer format.
 *
 * Example:
 *
 * ``` js
 * myIpAddress()
 *   // would return the string "198.95.249.79" if you were running the
 *   // Navigator on that host.
 * ```
 *
 * @return {String} external IP address
 */
export default async function myIpAddress(): Promise<string> {
	const servers = getServers();


	// get configured dns servers otherwise set 8.8.8.8:53 is "Google Public DNS":
	// https://developers.google.com/speed/public-dns/
	const dnsServerHost = servers ? servers[0] : '8.8.8.8';

	return new Promise((resolve, reject) => {

		const socket = net.connect({ host: dnsServerHost, port: 53 });
		const onError = (err: Error) => {
			// if we fail to access Google DNS (as in firewall blocks access),
			// fallback to querying IP locally
			resolve(ip.address());
		};
		socket.once('error', onError);
		socket.once('connect', () => {
			socket.removeListener('error', onError);
			const addr = socket.address();
			socket.destroy();
			if (typeof addr === 'string') {
				resolve(addr);
			} else if (addr.address) {
				resolve(addr.address);
			} else {
				reject(new Error('Expected a `string`'));
			}
		});
	});
}
