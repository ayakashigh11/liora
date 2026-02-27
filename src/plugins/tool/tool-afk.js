/**
 * @file AFK command plugin
 * @module plugins/tool/afk
 * @license Apache-2.0
 */

import { setAFK } from "#lib/afk.js";

let handler = async (m, { text }) => {
    const reason = text || (m.quoted && m.quoted.text) || "No reason";
    const success = setAFK(m.sender, reason);

    if (success) {
        await m.reply(`✅ *AFK Mode Active*\n\nReason: ${reason}\n\nLiora will notify you if anyone tags you.`);
    } else {
        await m.reply("❌ Failed to set AFK status.");
    }
};

handler.help = ["afk"];
handler.tags = ["tool"];
handler.command = /^(afk)$/i;

export default handler;
