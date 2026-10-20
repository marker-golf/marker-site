// Test-only stand-in for a long-running service: an HTTP server on a loopback
// port. Usage: node fake-service.mjs <port>
import http from 'node:http'
http.createServer((req, res) => res.end('fake')).listen(Number(process.argv[2]), '127.0.0.1')
