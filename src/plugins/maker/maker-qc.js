/**
 * @file Quote Chat command handler
 * @module plugins/maker/qc
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { sticker } from "#lib/sticker.js";

let handler = async (m, { sock, args, usedPrefix, command }) => {
    let text;
    let color = "hitam"; // Default color

    const colorMap = {
        "merah": "merah",
        "putih": "putih",
        "hijau": "hijau",
        "biru": "biru",
        "kuning": "kuning",
        "oranye": "oranye",
        "ungu": "ungu",
        "hitam": "hitam"
    };

    if (m.quoted) {
        text = m.quoted.text || "";
        if (args[0] && colorMap[args[0].toLowerCase()]) {
            color = colorMap[args[0].toLowerCase()];
        }
    } else {
        if (args[0] && colorMap[args[0].toLowerCase()]) {
            color = colorMap[args[0].toLowerCase()];
            text = args.slice(1).join(" ");
        } else {
            text = args.join(" ");
        }
    }

    if (!text) return m.reply(`Usage: ${usedPrefix + command} (color) <text>\nExample: ${usedPrefix + command} merah halo\n\nColors: merah, putih, hijau, biru, kuning, oranye, ungu, hitam.`);

    if (global.loading) await global.loading(m, sock);

    try {
        const targetJid = m.quoted ? m.quoted.sender : m.sender;
        const name = (m.quoted ? m.quoted.pushName : m.pushName) || (await sock.getName(targetJid)) || "User";
        let avatar;

        try {
            avatar = await sock.profilePictureUrl(targetJid, 'image');
        } catch {
            avatar = "https://files.catbox.moe/efqbov.jpg"; // Default avatar
        }

        const url = `https://api.nexray.web.id/maker/qc?text=${encodeURIComponent(text)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&color=${color}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`API returned ${res.status}`);

        const buf = await res.arrayBuffer();
        if (!buf) throw new Error("Failed to fetch image buffer");

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

handler.help = ["qc", "quotechat"];
handler.tags = ["maker"];
handler.command = /^(qc|quotechat)$/i;

export default handler;
