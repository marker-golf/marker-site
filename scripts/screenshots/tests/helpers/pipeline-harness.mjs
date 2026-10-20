// Test-only harness: runs lib/orchestrate.mjs runPipeline with steps passed
// as JSON in argv[2] ({ steps: [...], cleanup: [...] }) and exits with its code.
import { runPipeline } from '../../lib/orchestrate.mjs'
const { steps, cleanup } = JSON.parse(process.argv[2])
process.exit(await runPipeline({ steps, cleanup }))
