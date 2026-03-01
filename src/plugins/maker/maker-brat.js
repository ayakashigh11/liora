/**
 * @file Brat features command handler
 * @module plugins/maker/brat
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { sticker } from "#lib/sticker.js";

let handler = async (m, { sock, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Please provide text.\n\nExample: ${usedPrefix + command} halo`);

    if (global.loading) await global.loading(m, sock);

    try {
        let endpoint;
        switch (command.toLowerCase()) {
            case "brat":
                endpoint = "brat";
                break;
            case "brathd":
                endpoint = "brathd";
                break;
            case "bratvid":
                endpoint = "bratvid";
                break;
            default:
                endpoint = "brat";
        }

        const url = `https://api-faa.my.id/faa/${endpoint}?text=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API returned ${res.status}`);

        const buf = await res.arrayBuffer();
        if (!buf) throw new Error("Failed to fetch media buffer");

        const stiker = await sticker(Buffer.from(buf), {
            packName: global.config.stickpack,
            packPublish: global.config.stickauth
        });

        if (stiker) {
            await sock.sendMessage(m.chat, { sticker: stiker }, { quoted: m });
        } else {
            throw new Error("Sticker conversion failed");
        }
    } catch (e) {
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = ["brat", "brathd", "bratvid"];
handler.tags = ["maker"];
handler.command = /^(brat|brathd|bratvid)$/i;

export default handler;
