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

        // Primary API: Baguss
        let resultUrl = null;
        let buffer = null;

        try {
            const primaryUrl = `https://api.baguss.xyz/api/edits/remini?image=${encodeURIComponent(uploadResult.url)}`;
            const resPrimary = await fetch(primaryUrl);
            if (resPrimary.ok) {
                const dataPrimary = await resPrimary.json();
                if (dataPrimary.status && dataPrimary.result?.success && dataPrimary.result?.url) {
                    resultUrl = dataPrimary.result.url;
                }
            }
        } catch (e) {
            sock.logger.warn({ error: e.message }, "Remini primary API failed, trying fallback");
        }

        // Fallback API: Nexray (if primary failed)
        if (!resultUrl) {
            try {
                const fallbackUrl = `https://api.nexray.web.id/tools/remini?url=${encodeURIComponent(uploadResult.url)}`;
                const resFallback = await fetch(fallbackUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });

                if (!resFallback.ok) throw new Error(`Nexray API error: ${resFallback.statusText}`);

                const contentType = resFallback.headers.get('content-type') || "";
                if (contentType.includes('image')) {
                    buffer = Buffer.from(await resFallback.arrayBuffer());
                } else {
                    const dataFallback = await resFallback.json();
                    if (dataFallback.status && dataFallback.result) {
                        resultUrl = typeof dataFallback.result === 'string' ? dataFallback.result : dataFallback.result.url || dataFallback.result.download_url;
                    } else {
                        throw new Error(dataFallback.message || "Nexray API returned unsuccessful status.");
                    }
                }
            } catch (e) {
                throw new Error(`Both Remini APIs failed. Last error: ${e.message}`);
            }
        }

        if (!resultUrl && !buffer) {
            throw new Error("Failed to get upscaled image from any provider.");
        }

        await sock.sendMessage(m.chat, {
            image: buffer || { url: resultUrl },
            caption: `*UPSCALE / HD SUCCESS*\n\n> Powered by Liora`
        }, { quoted: m });

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
