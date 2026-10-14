# dsh-fuxux

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) plugin for
[Fuxux](https://www.fuxux.com), a social media scheduler. It connects the agent to the Fuxux
MCP server, so it can list your connected social accounts and draft, schedule or publish posts
to Instagram, Facebook, TikTok, YouTube, LinkedIn, X, Threads, Bluesky, Pinterest, Discord, Kick
and Twitch, and check what is scheduled or why a post failed.

## Install

```bash
dsh plugin --profile web add "github:abogitoff/fuxux-claude-plugin#path:/plugins/dsh-fuxux"
```

Then give it a Fuxux API key. Create one in Fuxux under **Settings → API keys** (API keys come
with the API add-on on a paid plan). Export it before starting dsh, or put it in `$DSH_HOME/.env`:

```bash
export FUXUX_API_KEY=fx_live_your_key_here
dsh web
```

Restart the profile after installing, connect your social accounts in Fuxux, then ask the agent
*"List my connected accounts in Fuxux"* to check the connection.

## What it adds

| Row | Package | What it does |
|---|---|---|
| `fuxux` | `dsh-fuxux` (this package) | Reads the API key, provides `ctx.fuxux` (`url`, `headers`) and registers the `fuxux` skill. |
| `fuxux-mcp` | `@deepseek-ai/dsh-mcp-client` (ships with dsh) | Connects to `https://www.fuxux.com/api/mcp` over streamable HTTP with a `Bearer` header. |

The tools appear as `mcp__fuxux__whoami`, `mcp__fuxux__list_connected_accounts`,
`mcp__fuxux__get_dashboard`, `mcp__fuxux__list_posts`, `mcp__fuxux__get_post`,
`mcp__fuxux__create_post`, `mcp__fuxux__update_post` and `mcp__fuxux__delete_post`.
Creating a post can publish it now, schedule it, or save it as a draft. To review everything
first, tell the agent to always save posts as drafts.

## Settings

Override the `fuxux` row in your profile's `cordis.patch.yml`:

| Key | Default | Meaning |
|---|---|---|
| `apiKeyEnv` | `FUXUX_API_KEY` | Environment variable that holds the key |
| `apiKey` | empty | Inline key (prefer the environment variable) |
| `skill` | `true` | Register the `fuxux` skill |

## Help

- Setup guides for other assistants: https://www.fuxux.com/agents
- Support: https://www.fuxux.com/support or support@fuxux.com
- Revoke a key at any time on the API keys page in Fuxux.

## License

MIT
