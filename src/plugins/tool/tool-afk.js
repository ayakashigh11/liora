/**
 * @file AFK command plugin
 * @module plugins/tool/afk
 * @license Apache-2.0
 */

import { setAFK } from "#lib/afk.js";

let handler = async (m, { text }) => {
    const reason = text || (m.quoted && m.quoted.text) || "Tanpa alasan";
    const success = setAFK(m.sender, reason);

    if (success) {
        await m.reply(`✅ *Status AFK Aktif*\n\nAlasan: ${reason}\n\nLiora akan memberitahu jika ada yang tag Anda.`);
    } else {
        await m.reply("❌ Gagal menetapkan status AFK.");
    }
};

handler.help = ["afk"];
handler.tags = ["tool"];
handler.command = /^(afk)$/i;

export default handler;
