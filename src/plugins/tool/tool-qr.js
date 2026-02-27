/**
 * @file QR Code tools plugin
 * @module plugins/tool/qr
 * @description Generate and scan QR codes locally
 * @license Apache-2.0
 */

import QRCode from "qrcode";
import jsQR from "jsqr";
import sharp from "sharp";

let handler = async (m, { sock, text, usedPrefix, command }) => {
    if (command === "toqr" || command === "qr") {
        const input = text.trim() || m.quoted?.text?.trim();
        if (!input) {
            return m.reply(`Please provide text to convert to QR Code.\n\nUsage: *${usedPrefix + command} (text)*\nExample: *${usedPrefix + command} https://google.com*`);
        }

        try {
            await global.loading(m, sock);

            // Generate QR Code as buffer
            const buffer = await QRCode.toBuffer(input, {
                margin: 2,
                scale: 10,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            });

            await sock.sendMessage(m.chat, {
                image: buffer,
                caption: `*✅ QR CODE GENERATED*\n\n🔍 *Content:* ${input}\n\n> Powered by Liora`
            }, { quoted: m });

        } catch (e) {
            sock.logger.error(e, "QR Generation error");
            await m.reply(`Error generating QR Code: ${e.message}`);
        } finally {
            await global.loading(m, sock, true);
        }

    } else if (command === "scanqr") {
        const q = m.quoted ?? m;
        const mime = (q.msg || q).mimetype || q.mediaType || "";

        if (!/image/.test(mime)) {
            return m.reply(`Please reply to or send an image containing a QR Code with *${usedPrefix + command}*`);
        }

        try {
            await global.loading(m, sock);

            const media = await q.download?.();
            if (!media) throw new Error("Failed to download image.");

            const buf = Buffer.isBuffer(media) ? media : media.data ? Buffer.from(media.data) : null;
            if (!buf) throw new Error("Empty image buffer.");

            // Use sharp to get raw pixel data for jsQR
            const { data, info } = await sharp(buf)
                .ensureAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

            const code = jsQR(new Uint8ClampedArray(data), info.width, info.height);

            if (!code) {
                return m.reply("❌ No QR Code found in this image. Make sure the QR is clear and well-lit.");
            }

            let txt = `*🔍 QR CODE SCANNED*\n\n`;
            txt += `*Content:* ${code.data}\n`;
            if (code.version) txt += `*Version:* ${code.version}\n`;

            await m.reply(txt);

        } catch (e) {
            sock.logger.error(e, "QR Scan error");
            await m.reply(`Error scanning QR Code: ${e.message}`);
        } finally {
            await global.loading(m, sock, true);
        }
    }
};

handler.help = ["toqr", "qr", "scanqr"];
handler.tags = ["tools"];
handler.command = /^(toqr|qr|scanqr)$/i;

export default handler;
