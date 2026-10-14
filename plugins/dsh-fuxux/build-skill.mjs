// Regenerates lib/skill.js from the repository's skills/social-media-posts/SKILL.md,
// so the DeepSeek Harness skill and the Claude/Cursor skill stay the same text.
//   node plugins/dsh-fuxux/build-skill.mjs   (run from the repository root)
import fs from "node:fs"

const md = fs.readFileSync("skills/social-media-posts/SKILL.md", "utf8").replace(/\r\n/g, "\n")
const body = md.replace(/^---[\s\S]*?\n---\n/, "").trim()
const intro =
  "In DeepSeek Harness the Fuxux tools appear with the prefix `mcp__fuxux__` (for example " +
  "`mcp__fuxux__list_connected_accounts` and `mcp__fuxux__create_post`). Wherever this guide " +
  "names a tool, use it with that prefix.\n\n"
const description =
  "Draft, schedule, publish, edit and review social media posts through the user's Fuxux account " +
  "(Instagram, Facebook, TikTok, YouTube, LinkedIn, X, Threads, Bluesky, Pinterest, Discord, Kick, Twitch). " +
  "Use when the user wants to post or schedule something, asks what is scheduled or published, or asks why a post failed."

const out = `/**
 * The \`fuxux\` skill registered on \`ctx.skills\`: how to use the Fuxux tools well.
 * Generated from skills/social-media-posts/SKILL.md by build-skill.mjs; edit that file instead.
 */

export const SKILL_NAME = "fuxux"

export const SKILL_DESCRIPTION = ${JSON.stringify(description)}

export const SKILL_CONTENT = ${JSON.stringify(intro + body)}
`
fs.writeFileSync("plugins/dsh-fuxux/lib/skill.js", out)
console.log("wrote plugins/dsh-fuxux/lib/skill.js", out.length, "bytes")
