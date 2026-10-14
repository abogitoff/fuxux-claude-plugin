/**
 * dsh-fuxux: connects DeepSeek Harness to the Fuxux MCP server.
 *
 * This plugin provides the `fuxux` service: the MCP endpoint and the
 * Authorization header built from a Fuxux API key. The `fuxux-mcp` row in
 * cordis.patch.yml (an @deepseek-ai/dsh-mcp-client instance) injects it, so the
 * key never has to be written into configuration. The plugin also registers
 * the `fuxux` skill when a skills service is available.
 *
 * Only named exports: the loader expects `name`, `Config` and `apply`.
 */
import z from "@deepseek-ai/schemastery"
import { SKILL_CONTENT, SKILL_DESCRIPTION, SKILL_NAME } from "./skill.js"
import { resolveConnection } from "./connection.js"

export { resolveConnection, DEFAULT_URL } from "./connection.js"

export const name = "dsh-fuxux"

/** Service this plugin provides; the MCP client row injects it. */
export const FUXUX_SERVICE = "fuxux"

export const Config = z.object({
  /** Environment variable that holds the Fuxux API key (fx_live_...). */
  apiKeyEnv: z.string().default("FUXUX_API_KEY"),
  /** Inline key, for profile-level overrides. The environment variable is preferred. */
  apiKey: z.string().role("secret").default(""),
  /** MCP endpoint. Only change it for testing. */
  url: z.string().default("https://www.fuxux.com/api/mcp"),
  /** Register the `fuxux` skill on `ctx.skills`. */
  skill: z.boolean().default(true),
})

export function apply(ctx, config) {
  const cfg = Config(config ?? {})
  const conn = resolveConnection(cfg)
  const log = ctx.logger ?? console

  if (conn.configured) {
    log.info?.(`dsh-fuxux: using ${conn.url} (API key from ${conn.source})`)
  } else {
    log.warn?.(
      `dsh-fuxux: no Fuxux API key found. Create one in Fuxux under Settings > API keys and set ${cfg.apiKeyEnv}; ` +
        "until then the fuxux-mcp row connects without credentials and gets no tools.",
    )
  }

  // A fresh, unfrozen headers object for every read: the MCP client row
  // validates the interpolated value and must be able to use it as its own.
  ctx.provide(FUXUX_SERVICE, {
    url: conn.url,
    get headers() {
      return { ...conn.headers }
    },
    configured: conn.configured,
  })

  if (cfg.skill) {
    ctx.inject(["skills"], (sctx) => {
      if (typeof sctx.skills?.register !== "function") return
      sctx.skills.register({
        name: SKILL_NAME,
        description: SKILL_DESCRIPTION,
        content: SKILL_CONTENT,
        source: "runtime",
        invocation: { modelInvocable: true, userInvocable: true },
      })
    })
  }
}
