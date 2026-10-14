/** The hosted Fuxux MCP endpoint. */
export const DEFAULT_URL = "https://www.fuxux.com/api/mcp"

/**
 * Work out the endpoint and headers from the config and the environment.
 * Kept free of runtime dependencies so it can be tested on its own.
 * @param {{ apiKeyEnv?: string, apiKey?: string, url?: string }} config
 * @param {Record<string, string | undefined>} env
 */
export function resolveConnection(config, env = process.env) {
  const url = String(config?.url || DEFAULT_URL).trim()
  const envName = String(config?.apiKeyEnv || "FUXUX_API_KEY")
  const inline = String(config?.apiKey || "").trim()
  const fromEnv = String(env[envName] || "").trim()
  const key = inline || fromEnv
  return {
    url,
    headers: key ? { Authorization: `Bearer ${key}` } : {},
    configured: key.length > 0,
    source: inline ? "config.apiKey" : fromEnv ? `env.${envName}` : "none",
  }
}
