/**
 * @file Universal Image Converter plugin
 * @module plugins/tool/convertimg
 * @description Convert images between various formats using sharp
 * @license Apache-2.0
 * @author ayakashigh11
 */

import sharp from "sharp";

let handler = async (m, { sock, args, usedPrefix, command }) => {
    const q = m.quoted ?? m;
    const mediaType = q.mediaType || (q.msg || q).mimetype || "";

    if (!/image/.test(mediaType)) {
        return m.reply(`Please reply to an image or send an image with *${usedPrefix + command}* to convert it.`);
    }

    // Supported formats and their aliases
    const formatMap = {
        "jpg": "jpeg",
        "jpeg": "jpeg",
        "png": "png",
        "webp": "webp",
        "gif": "gif",
        "avif": "avif",
        "tiff": "tiff",
        "heif": "heif"
    };

    const target = (args[0] || "jpeg").toLowerCase();
    const targetFormat = formatMap[target];

    if (!targetFormat) {
        return m.reply(`❌ Unsupported format: *${target}*\n\nAvailable formats: ${Object.keys(formatMap).filter((v, i, a) => a.indexOf(v) === i).join(", ")}`);
    }

    try {
        await global.loading(m, sock);

        const media = await q.download?.();
        if (!media) throw new Error("Failed to download image.");

        const buf = Buffer.isBuffer(media) ? media : media.data ? Buffer.from(media.data) : null;
        if (!buf || buf.length === 0) throw new Error("Empty image buffer.");

        // Convert image using sharp
        const outputBuffer = await sharp(buf)
            .toFormat(targetFormat)
            .toBuffer();

        const fileName = `converted_${Date.now()}.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`;
        const mimeType = `image/${targetFormat}`;

        const fromFormat = (mediaType.split('/')[1] || "IMG").toUpperCase();

        // Send as image or document depending on format/use case
        // Some formats like TIFF/AVIF might be better as documents in WA
        const isDocument = ["tiff", "avif", "heif"].includes(targetFormat);

        if (isDocument) {
            await sock.sendMessage(m.chat, {
                document: outputBuffer,
                mimetype: mimeType,
                fileName: fileName,
                caption: `*✅ CONVERSION COMPLETED*\n\n📤 *From:* ${fromFormat}\n📥 *To:* ${target.toUpperCase()}\n\n> Powered by Liora`
            }, { quoted: m });
        } else {
            await sock.sendMessage(m.chat, {
                image: outputBuffer,
                caption: `*✅ CONVERSION COMPLETED*\n\n📤 *From:* ${fromFormat}\n📥 *To:* ${target.toUpperCase()}\n\n> Powered by Liora`
            }, { quoted: m });
        }

    } catch (e) {
        sock.logger.error(e, "Image conversion error");
        await m.reply(`❌ Error converting image: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["convertimg", "converto", "imgconv"];
handler.tags = ["tools"];
handler.command = /^(convertimg|converto|imgconv)$/i;

handler.settings = {
    loading: true
};

export default handler;
