# Fuxux for Claude

Draft, schedule and publish social media posts from Claude, and keep an eye on your posting queue, using your [Fuxux](https://www.fuxux.com) account.

Supported platforms: Instagram, Facebook, TikTok, YouTube, LinkedIn, X, Threads, Bluesky, Pinterest, Discord, Kick and Twitch.

## What is in this plugin

- **The Fuxux MCP server** (`https://www.fuxux.com/api/mcp`), with eight tools: `whoami`, `list_connected_accounts`, `get_dashboard`, `list_posts`, `get_post`, `create_post`, `update_post` and `delete_post`.
- **A skill** that teaches Claude how to use those tools well: one caption per platform, drafts before publishing, each platform's limits, and what to do when a post fails.

## What you need

- A Fuxux account on any plan, including Free. Your plan's limits apply as they do in the web app.
- At least one social account connected in Fuxux under Connections. Claude can only post to accounts you have connected there.

No API key is needed. The first time Claude uses Fuxux, your browser opens Fuxux, you sign in and choose **Allow access**.

## What Claude can and cannot do

Claude can read your connected accounts and posts, and create, edit, schedule, publish and delete posts. It cannot change your plan, billing, password or connected social accounts.

You can remove Claude's access at any time in Fuxux under **Settings → Connected apps**. It stops working straight away.

## Try it

- "What do I have scheduled in Fuxux this week, and did anything fail?"
- "Write a post announcing our new pricing page, one version for LinkedIn and one for Bluesky, and save both as drafts."
- "Move tomorrow's Instagram post to Friday at 9 am."

## Other assistants

The same server and skill work outside Claude.

- **Gemini CLI:** `gemini extensions install https://github.com/abogitoff/fuxux-claude-plugin`, then start `gemini` and approve the Fuxux sign-in.
- **Any other MCP client:** add `https://www.fuxux.com/api/mcp` as a remote server. Setup steps per assistant are at https://www.fuxux.com/agents.

## Help

- Setup guide: https://www.fuxux.com/mcp/docs
- Support: https://www.fuxux.com/support or support@fuxux.com
- Privacy policy: https://www.fuxux.com/privacy

## License

MIT. See [LICENSE](LICENSE).
