/**
 * @file Spotify Downloader plugin
 * @module plugins/downloader/spotify
 * @description Download music from Spotify using NexRay API
 * @license Apache-2.0
 */

import fetch from "node-fetch";

let handler = async (m, { sock, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Please provide a Spotify URL.\n\nUsage: *${usedPrefix + command} (url)*\nExample: *${usedPrefix + command} https://open.spotify.com/track/xxxxxx*`);

    const url = text.trim();
    if (!/spotify\.com/i.test(url)) {
        return m.reply("❌ Invalid URL. Make sure it is a Spotify link.");
    }

    try {
        await global.loading(m, sock);

        m.reply(`⏳ *Processing...* Fetching music from Spotify.`);

        const res = await fetch(`https://api.nexray.web.id/downloader/v1/spotify?url=${encodeURIComponent(url)}`);

        if (!res.ok) throw new Error(`NexRay API error: ${res.statusText}`);

        const json = await res.json();
        if (!json.status || !json.result) {
            return m.reply(`❌ Failed to fetch music. Ensure the link is correct or try again later.`);
        }

        const { title, artist, album, thumbnail, url: downloadUrl, duration } = json.result;

        if (!downloadUrl) {
            return m.reply("❌ No download link found for this track.");
        }

        const artists = Array.isArray(artist) ? artist.join(", ") : artist;

        await sock.sendMessage(m.chat, {
            audio: { url: downloadUrl },
            mimetype: "audio/mpeg",
            contextInfo: {
                externalAdReply: {
                    title: title || "Spotify Track",
                    body: artists || "Unknown Artist",
                    thumbnailUrl: thumbnail,
                    mediaUrl: url,
                    mediaType: 2,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });

    } catch (e) {
        global.logger.error({ error: e.message, url }, "Spotify Downloader error");
        m.reply(`❌ An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["spotify"];
handler.tags = ["downloader"];
handler.command = /^(spotify|sp)$/i;

export default handler;
