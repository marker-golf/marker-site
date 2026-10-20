// macOS Seatbelt network sandbox for every process the pipeline starts.
//
// Each profile allows outbound connections only to the listed loopback ports.
// All other outbound traffic (other loopback ports, LAN, internet, IPv4 and
// IPv6) is refused by the kernel, and the system DNS resolver socket is denied
// so hostnames cannot even be resolved. Unix-domain sockets stay available for
// local IPC. Launching apps or URLs through /usr/bin/open or osascript is
// denied. Use 127.0.0.1 (never "localhost") in URLs.

import { SANDBOX_PORTS } from './config.mjs'

export function sandboxProfile (ports) {
  if (!ports.length || !ports.every(p => Number.isInteger(p) && p > 0 && p < 65536)) {
    throw new Error(`Invalid sandbox port list: ${ports}`)
  }
  return [
    '(version 1)',
    '(allow default)',
    '(deny network-outbound)',
    ...ports.map(port => `(allow network-outbound (remote ip "localhost:${port}"))`),
    '(allow network-outbound (remote unix-socket))',
    '(deny network-outbound (remote unix-socket (path-literal "/private/var/run/mDNSResponder")))',
    // No sandboxed process may open apps or URLs in the user's session (for
    // example a dev-server plugin trying to open a browser tab).
    '(deny process-exec (literal "/usr/bin/open") (literal "/usr/bin/osascript"))'
  ].join('\n')
}

// [binary, args] that run `cmd` inside the named profile ("hub", "vue",
// "browser") or an explicit port list (tests).
export function sandboxArgs (profile, cmd, args) {
  const ports = Array.isArray(profile) ? profile : SANDBOX_PORTS[profile]
  if (!ports) throw new Error(`Unknown sandbox profile: ${profile}`)
  return ['/usr/bin/sandbox-exec', ['-p', sandboxProfile(ports), cmd, ...args]]
}
