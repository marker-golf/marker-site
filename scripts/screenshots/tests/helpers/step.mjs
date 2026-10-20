// Test-only pipeline step. Usage: node step.mjs <action> [args]
//   sleep <seconds> | fail | mark <file> | launch-fake <port> <runDir> <cwd> | stop-fake <port> <runDir> <cwd>
import fs from 'node:fs'
import path from 'node:path'
import { launchService, stopAll } from '../../lib/processes.mjs'
import { fakeService, waitForPort } from './fake.mjs'

const [action, ...args] = process.argv.slice(2)
if (action === 'sleep') await new Promise(resolve => setTimeout(resolve, Number(args[0]) * 1000))
else if (action === 'fail') process.exit(3)
else if (action === 'mark') fs.appendFileSync(args[0], 'cleanup\n')
else if (action === 'launch-fake') {
  const [port, runDir, cwd] = args
  launchService(fakeService(Number(port), cwd), runDir, path.join(runDir, 'fake.log'))
  if (!(await waitForPort(Number(port)))) process.exit(4)
} else if (action === 'stop-fake') {
  const [port, runDir, cwd] = args
  if (!(await stopAll([fakeService(Number(port), cwd)], runDir))) process.exit(5)
} else process.exit(9)
