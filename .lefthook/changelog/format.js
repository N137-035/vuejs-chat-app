import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim()
const { owner, repo } = remoteUrl.match(/.+:(?<owner>.+)\/(?<repo>.+).git/).groups
const url = `https://github.com/${owner}/${repo}`

const __filename = 'CHANGELOG.md'
const __changelog = readFileSync(__filename, 'utf8')

const changelog = __changelog
  .replaceAll('&quot;', '"')
  .replaceAll('&#x60;', '`')
  .split('\n')
  .map((line, i) => {
    if (i === 3) {
      const versionMatch = line.match(/(?<version>[0-9]+\.[0-9]+\.[0-9]+)/)
      const { version } = versionMatch.groups
      let tag = execSync('git rev-parse --short $(git rev-list --max-parents=0 HEAD)', {
        encoding: 'utf-8'
      }).trim()
      try {
        tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim()
      } catch {} // eslint-disable-line no-empty
      return line.replace(version, `[v${version}](${url}/compare/${tag}...v${version})`)
    }
    const issueMatches = line.matchAll(/[(,](?<issue>#[0-9]+)/g)
    let addedLength = 0
    ;[...issueMatches].forEach((match) => {
      const {
        index,
        groups: { issue }
      } = match
      const link = `[${issue}](${url}/issues/${issue.slice(1)})`
      const addedIndex = index + addedLength
      line = line.slice(0, addedIndex) + link + line.slice(addedIndex + issue.length)
      addedLength += link.length - issue.length
    })
    const hashMatch = line.match(/\[(?<ref>[0-9a-z]{7})\]$/)
    if (hashMatch) {
      const { ref } = hashMatch.groups
      line = line.replace(ref, `[${ref}](${url}/commit/${ref})`)
    }
    return line
  })
  .join('\n')

writeFileSync(__filename, changelog)
