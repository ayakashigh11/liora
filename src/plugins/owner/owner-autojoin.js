/**
 * @file Owner Autojoin plugin
 * @module plugins/owner/autojoin
 * @description Automatically join groups and channels from links
 * @license Apache-2.0
 */

import { isAutojoinEnabled, setAutojoinEnabled } from "#lib/autojoin.js";

const GROUP_LINK_RE = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,26})/i;
const CHANNEL_LINK_RE = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i;

let handler = async (m, { sock, text, usedPrefix, command }) => {
    const args = text.toLowerCase().split(/\s+/);
    const action = args[0]; // group, channel, list
    const state = args[1]; // on, off

    if (action === "list" || !action) {
        const g = isAutojoinEnabled("group") ? "✅ ON" : "❌ OFF";
        const c = isAutojoinEnabled("channel") ? "✅ ON" : "❌ OFF";
        return m.reply(`*🛠️ AUTOJOIN SETTINGS*\n\n• *Group:* ${g}\n• *Channel:* ${c}\n\n*Usage:*\n• ${usedPrefix + command} group on/off\n• ${usedPrefix + command} channel on/off`);
    }

    if (action === "group" || action === "channel") {
        if (!state || !/on|off/.test(state)) {
            return m.reply(`Please specify 'on' or 'off'.\nExample: *${usedPrefix + command} ${action} on*`);
        }

        const status = state === "on";
        setAutojoinEnabled(action, status);
        return m.reply(`*✅ AUTOJOIN UPDATED*\n\n*${action.toUpperCase()}* autojoin is now *${status ? "ENABLED" : "DISABLED"}*.`);
    }

    m.reply(`Invalid sub-command. Use *list*, *group*, or *channel*.`);
};

/**
 * Background hook to scan all messages for links
 */
handler.all = async function (m, { chatUpdate }) {
    if (!m.text || m.fromMe) return;

    // 1. Group Autojoin
    if (isAutojoinEnabled("group")) {
        const groupMatch = m.text.match(GROUP_LINK_RE);
        if (groupMatch) {
            const code = groupMatch[1];
            try {
                // Check if already in group (optional optimization, but Baileys handles it)
                await this.groupAcceptInvite(code);
                this.logger.info({ code }, "Autojoined group");
            } catch (e) {
                this.logger.error({ code, error: e.message }, "Failed to autojoin group");
            }
        }
    }

    // 2. Channel Autojoin
    if (isAutojoinEnabled("channel")) {
        const channelMatch = m.text.match(CHANNEL_LINK_RE);
        if (channelMatch) {
            const code = channelMatch[1];
            try {
                // For channels/newsletters, we first need to get metadata to find JID
                const newsletter = await this.newsletterMetadata("invite", code);
                if (newsletter?.id) {
                    await this.newsletterFollow(newsletter.id);
                    this.logger.info({ id: newsletter.id, name: newsletter.name }, "Autofollowed channel");
                }
            } catch (e) {
                this.logger.error({ code, error: e.message }, "Failed to autofollow channel");
            }
        }
    }
};

handler.help = ["autojoin"];
handler.tags = ["owner"];
handler.command = /^(autojoin)$/i;
handler.owner = true;

export default handler;
