---
name: social-media-posts
description: >-
  Draft, schedule, publish, edit and review social media posts through the user's Fuxux
  account. Use when the user wants to post or schedule something on Instagram, Facebook,
  TikTok, YouTube, LinkedIn, X (Twitter), Threads, Bluesky, Pinterest, Discord, Kick or
  Twitch, asks what is scheduled or published, wants to move or rewrite a scheduled post,
  or asks why a post failed.
---

# Social media posts with Fuxux

Fuxux is a social media scheduler. The `fuxux` MCP server gives you eight tools that act on the signed-in user's Fuxux account. Use them instead of describing what the user should do in the web app.

## Tools

| Tool | Use it to |
|------|-----------|
| `whoami` | Confirm the connection works and see the user's plan |
| `list_connected_accounts` | See which social accounts can be posted to, with their `id`, `platform` and `status` |
| `get_dashboard` | Get a quick summary: counts, upcoming posts, accounts needing attention |
| `list_posts` | Read the queue. Filters: `month` (`YYYY-MM`), `status` (`scheduled`, `published`, `draft`, `failed`, `all`), `limit` (1 to 50), `offset`, `order` (`upcoming`, `newest`, `recently_published`, `recently_updated`) |
| `get_post` | Read one post with its per-platform variants (you need the variant ids to edit captions) |
| `create_post` | Publish now, schedule (`scheduled_at`) or save a draft (`draft: true`) |
| `update_post` | Reschedule, change captions (`variant_updates`) or replace media on a draft or scheduled post |
| `delete_post` | Delete a draft or scheduled post so it never publishes |

## Before you create a post

1. Call `list_connected_accounts` once per conversation. Only write captions for platforms that appear there with `status: "connected"`. If an account is `expired`, tell the user to reconnect it in Fuxux under Connections; do not try to post to it.
2. Decide between draft, schedule and publish now:
   - If the user asked you to write or prepare something, save it with `draft: true` and tell them it is waiting in Fuxux.
   - If they gave a date or time, set `scheduled_at`.
   - **`create_post` without `scheduled_at` or `draft` publishes immediately and publicly.** Only do that when the user clearly asked to post now. If you are not sure, show the captions and ask.
3. A post that is already published cannot be edited or recalled through Fuxux. Deleting it removes only Fuxux's record; it stays on the social platform.

## Writing captions

`captions` is a map of platform id to text, one caption per platform. Write each one for its platform rather than copying the same text everywhere.

| Platform | Id | Caption limit |
|----------|----|---------------|
| X (Twitter) | `twitter` | 280 |
| Instagram | `instagram` | 2200 |
| LinkedIn | `linkedin` | 3000 |
| Facebook | `facebook` | 63206 |
| TikTok | `tiktok` | 2200 |
| YouTube | `youtube` | 5000 |
| Bluesky | `bluesky` | 300 |
| Threads | `threads` | 500 |
| Pinterest | `pinterest` | 500 |
| Discord | `discord` | 2000 |
| Kick | `kick` | 140 |
| Twitch | `twitch` | 140 |

Platform rules that catch people out:

- **Instagram, TikTok, YouTube and Pinterest need media.** A text-only post to them fails. TikTok and YouTube need a video.
- **Kick and Twitch have no posts.** The first line of the caption becomes the channel's stream title. No media.
- **Reddit and Google Business Profile are not available here.** Reddit posts are made in the Fuxux web app; say so rather than retrying.

## Choosing accounts

Without `targets`, each captioned platform posts to the user's first connected account on that platform. When the user has more than one account on a platform, or names a specific one, pass `targets` with the `account_id` and `platform` from `list_connected_accounts`. Optional per target: `format` (`feed` or `story`, Instagram and Facebook only) and `board_id` (Pinterest).

## Media

`media_urls` takes up to four public `https` URLs to images or videos. The URLs must be reachable without a login. You cannot upload a file from the conversation; ask the user for a public link, or have them add the media to the draft in Fuxux.

## Scheduling

`scheduled_at` is an ISO 8601 datetime in the future. Users speak in their own local time: if you do not know their timezone, ask once, then convert and include the offset (for example `2026-05-20T09:00:00+02:00`). Repeat the final date and time back to the user after scheduling.

To move a scheduled post, call `update_post` with a new `scheduled_at`. To change wording, call `get_post` first to get each variant's id, then `update_post` with `variant_updates`.

## Reading results

When you publish now, `create_post` returns a `results` list with one entry per platform:

- `success: true` with a `platform_post_id` means it is live.
- `still_processing: true` means the platform accepted it and is still working. Do not retry and do not call it a failure. Check again with `get_post` after about a minute, once.
- `inbox_pending: true` means the platform put it in its own inbox (TikTok does this) and the user finishes posting in that platform's app.
- Otherwise `error` says why it failed. Tell the user the reason in plain words and what would fix it.

For "why did my post fail?", use `list_posts` with `status: "failed"` and read each variant's `error_message`.

## Limits

- If a tool says a plan limit was reached (for example the monthly post allowance), tell the user what the message says and stop. Do not suggest plans or upgrades; if they ask, plan details are at https://www.fuxux.com/pricing.
- If a tool says to wait a number of seconds, wait that long before trying again. Do not poll in a loop; post status changes over minutes, so checking once a minute is plenty.
- If a tool returns an authentication error, the user's access has expired or been removed. Ask them to connect Fuxux again.

## Safety

- Confirm before publishing immediately, before deleting, and before creating more than a few posts in one go.
- Never ask the user for a Fuxux password or API key. Connecting accounts and sign-in happen in the browser.
- New social accounts are connected by the user in Fuxux under Connections, not through these tools.
