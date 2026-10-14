import { test } from "node:test"
import assert from "node:assert/strict"
import { resolveConnection, DEFAULT_URL } from "../lib/connection.js"
import { SKILL_CONTENT, SKILL_NAME } from "../lib/skill.js"

test("reads the key from FUXUX_API_KEY", () => {
  const c = resolveConnection({}, { FUXUX_API_KEY: " fx_live_abc " })
  assert.equal(c.url, DEFAULT_URL)
  assert.deepEqual(c.headers, { Authorization: "Bearer fx_live_abc" })
  assert.equal(c.configured, true)
  assert.equal(c.source, "env.FUXUX_API_KEY")
})

test("an inline key wins over the environment", () => {
  const c = resolveConnection({ apiKey: "fx_live_inline" }, { FUXUX_API_KEY: "fx_live_env" })
  assert.equal(c.headers.Authorization, "Bearer fx_live_inline")
  assert.equal(c.source, "config.apiKey")
})

test("no key: no header, not configured", () => {
  const c = resolveConnection({ apiKeyEnv: "OTHER" }, {})
  assert.deepEqual(c.headers, {})
  assert.equal(c.configured, false)
})

test("the skill names the prefixed tools", () => {
  assert.equal(SKILL_NAME, "fuxux")
  assert.match(SKILL_CONTENT, /mcp__fuxux__create_post/)
})
