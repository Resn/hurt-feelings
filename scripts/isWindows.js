import os from 'node:os'
import process from 'node:process'

/**
 * Determine whether the Node.js process runs on Windows.
 * Used by package.json scripts to determine whether to run unix or windows commands.
 *
 * @returns {Boolean}
 */
function isWindows() {
  return os.platform() === 'win32'
}

if (isWindows()) {
  process.exitCode = 0
} else {
  process.exitCode = 1
}
