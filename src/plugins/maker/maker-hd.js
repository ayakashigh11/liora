/**
 * @file Image upscale/HD command handler
 * @module plugins/maker/hd
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { uploader } from "#lib/uploader.js";

let handler = async (m, { sock, usedPrefix, command }) => {
    try {
        const q = m.quoted ?? m;
        const mime = (q.msg || q).mimetype || q.mediaType || "";

        if (!/image\/(jpe?g|png)/.test(mime)) {
            return m.reply(`*Upscale / HD Image*\n\n*Usage:*\n• Reply to an image with *${usedPrefix + command}*\n• Send an image with caption *${usedPrefix + command}*`);
        }

        await global.loading(m, sock);

        const media = await q.download?.();
        if (!media) return m.reply("Failed to download image.");

        const buf = Buffer.isBuffer(media)
            ? media
            : media.data
                ? Buffer.from(media.data)
                : null;

        if (!buf) throw new Error("Empty image buffer.");

        // Upload to a public host to get a URL for the Nexray API
        const uploadResult = await uploader(buf);
        if (!uploadResult.success || !uploadResult.url) {
            throw new Error("Failed to upload image to file host for processing.");
        }

        const apiUrl = `https://api.nexray.web.id/tools/remini?url=${encodeURIComponent(uploadResult.url)}`;
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!res.ok) throw new Error(`Nexray API error: ${res.statusText}`);

        const contentType = res.headers.get('content-type') || "";
        if (contentType.includes('image')) {
            const buffer = Buffer.from(await res.arrayBuffer());
            await sock.sendMessage(m.chat, {
                image: buffer,
                caption: `*UPSCALE / HD SUCCESS*\n\n> Powered by Liora`
            }, { quoted: m });
        } else {
            const d = await res.json();
            if (!d.status || !d.result) {
                throw new Error(d.message || "Nexray API returned an unsuccessful status.");
            }

            const resultUrl = typeof d.result === 'string' ? d.result : d.result.url || d.result.download_url;
            if (!resultUrl) throw new Error("Upscaled image URL not found in API response.");

            await sock.sendMessage(m.chat, {
                image: { url: resultUrl },
                caption: `*UPSCALE / HD SUCCESS*\n\n> Powered by Liora`
            }, { quoted: m });
        }

    } catch (e) {
        sock.logger.error(e);
        m.reply(`Error: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["hd", "upscale", "remini"];
handler.tags = ["maker"];
handler.command = /^(hd|upscale|remini)$/i;

export default handler;
