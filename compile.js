
module.exports = compile;

var builtIns = [
  'isPlainHostName',
  'dnsDomainIs',
  'localHostOrDomainIs',
  'isResolvable',
  'isInNet',
  'dnsResolve',
  'myIpAddress',
  'dnsDomainLevels',
  'shExpMatch',
  'weekdayRange',
  'dateRange',
  'timeRange'
];

var r = new RegExp('(' + builtIns.join('|') + ')\\(', 'g');

function compile (str) {
  return String(str)
    .replace(/function FindProxyForURL/, 'function* FindProxyForURL')
    .replace(r, 'yield $1(');
}
