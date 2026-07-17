import { existsSync } from 'node:fs'
import { Config } from '@remotion/cli/config'

// Render reproducible sin depender de descargas: usa el Chrome/Edge local si existe.
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter((candidate): candidate is string => Boolean(candidate))

const chrome = chromeCandidates.find((candidate) => existsSync(candidate))
if (chrome) {
  Config.setBrowserExecutable(chrome)
  Config.setChromeMode('chrome-for-testing')
}

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
Config.setConcurrency(4)
