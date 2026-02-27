/**
 * @file ToNaked Image transformation plugin
 * @module plugins/maker/tonaked
 * @description Transforms an image using API via custom Baguss API
 * @license Apache-2.0
 */

import { uploader } from "#lib/uploader.js";

let handler = async (m, { sock, usedPrefix, command }) => {
    const q = m.quoted?.mimetype ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime || !/image/.test(mime)) {
        return m.reply(`Please reply or send an image with the *${usedPrefix + command}* command.`);
    }

    try {
        await global.loading(m, sock);

        // 1. Download the image
        const imgBuffer = await q.download?.();
        if (!imgBuffer) throw new Error("Failed to download image.");

        // 2. Upload to temporary server to get a URL
        const uploadRes = await uploader(imgBuffer);
        if (!uploadRes.success || !uploadRes.url) {
            throw new Error("Failed to upload image to temporary server.");
        }

        const imageUrl = uploadRes.url;

        // 3. Call Baguss API
        const apiUrl = `https://api.baguss.xyz/api/edits/tobugil?image=${encodeURIComponent(imageUrl)}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API Service Error (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (!data.success || !data.url) {
            throw new Error("Failed to process image. The service might be temporarily down.");
        }

        // 4. Send back the result
        await sock.sendMessage(m.chat, {
            image: { url: data.url },
            caption: `*🎨 Image Transformed Successfully!*\n\n*By:* Bagus Bahril`
        }, { quoted: m });

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "ToNaked plugin error");
        await m.reply(`An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["tonaked"];
handler.tags = ["maker"];
handler.command = /^(tonaked|tobugil)$/i;

export default handler;
