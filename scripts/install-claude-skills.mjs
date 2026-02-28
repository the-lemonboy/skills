#!/usr/bin/env node
/**
 * Copy this repo's skills/ to Claude Code global skills directory
 * so Claude Code can load them (~/.claude/skills/ on Mac/Linux, %USERPROFILE%\.claude\skills on Windows).
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')
const skillsSource = join(root, 'skills')

const home = process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH
const claudeSkillsDir = join(home, '.claude', 'skills')

if (!home) {
  console.error('Could not determine home directory (HOME / USERPROFILE)')
  process.exit(1)
}

if (!existsSync(skillsSource)) {
  console.error('Skills directory not found. Run from repo root and ensure skills/ exists.')
  process.exit(1)
}

mkdirSync(claudeSkillsDir, { recursive: true })

const dirs = readdirSync(skillsSource, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)

if (dirs.length === 0) {
  console.log('No skill directories found in skills/. Run "pnpm start sync" first.')
  process.exit(0)
}

console.log(`Installing ${dirs.length} skills to ${claudeSkillsDir}\n`)

for (const name of dirs) {
  const src = join(skillsSource, name)
  const dest = join(claudeSkillsDir, name)
  cpSync(src, dest, { recursive: true, force: true })
  console.log(`  ✓ ${name}`)
}

console.log('\nDone. Restart Claude Code (or reload window) so it picks up the skills.')
console.log('To verify: ask Claude to "apply React best practices" or "use wp-block-development" in a relevant project.')
