/**
 * @file NSFW Image Editor AI plugin
 * @module plugins/ai/nsfwedit
 * @description Edits an image for NSFW contexts using AI via custom Danzy API
 * @license Apache-2.0
 */

import { uploader } from "#lib/uploader.js";

let handler = async (m, { sock, text, usedPrefix, command }) => {
    const q = m.quoted?.mimetype ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime || !/image/.test(mime)) {
        return m.reply(`Please reply or send an image with the *${usedPrefix + command}* command and a prompt.`);
    }

    if (!text) {
        return m.reply(`Please provide a prompt describing how to edit the image.\nExample: *${usedPrefix + command} remove clothes*`);
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

        // 3. Call Danzy AI API
        const apiUrl = new URL("https://api.danzy.web.id/api/ai/editimg");
        apiUrl.searchParams.append("prompt", text);
        apiUrl.searchParams.append("url", imageUrl);

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
            throw new Error(`AI Service Error (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (!data.status || !data.result?.imageUrl) {
            throw new Error("Failed to process image. The AI might not have understood your prompt or the service is temporarily down.");
        }

        // 4. Send back the result
        await sock.sendMessage(m.chat, {
            image: { url: data.result.imageUrl },
            caption: `*🎨 Image Edited Successfully!*\n\n*Prompt:* ${text}\n*By:* Danzz`
        }, { quoted: m });

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "NSFW Edit plugin error");
        await m.reply(`An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["nsfwedit"];
handler.tags = ["ai"];
handler.command = /^(nsfwedit|nsfwei)$/i;

export default handler;
