// Where a demo-video run writes its review files. Approved review outputs are
// never overwritten: when any output name already exists in the recipe's
// review folder, the run writes into a rerun-<runId> subfolder instead,
// unless the caller explicitly asks to replace them.

import fs from 'node:fs'
import path from 'node:path'

export function reviewOutputDir (dir, names, { replace = false, runId }) {
  if (replace || !names.some(name => fs.existsSync(path.join(dir, name)))) return dir
  if (!/^[\w-]+$/.test(runId)) throw new Error(`Invalid run id ${runId}`)
  return path.join(dir, `rerun-${runId}`)
}
