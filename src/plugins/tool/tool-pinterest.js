/**
 * @file Pinterest Search plugin
 * @module plugins/tool/pinterest
 * @description Search images on Pinterest with pagination
 * @license Apache-2.0
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Please provide a query to search on Pinterest.\n\nUsage: *${usedPrefix + command} (query)*\nExample: *${usedPrefix + command} aesthetic wallpaper*`);
    }

    try {
        await global.loading(m, sock);

        const apiUrl = `https://api.danzy.web.id/api/search/pinterest?q=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Search Service Error (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (!data.status || !data.result || data.result.length === 0) {
            throw new Error(`No results found for "${text}".`);
        }

        const allResults = data.result;

        // Prepare album
        const albumMessages = allResults.map((item, i) => ({
            image: { url: item.image },
            caption: `*${i + 1}. ${item.title || "No Title"}*\n📍 Board: ${item.board || "-"}\n👤 User: ${item.username || "-"}\n🔗 [Source](${item.source})`
        }));

        // Send album
        await sock.client(m.chat, {
            album: albumMessages,
            caption: `*📌 Pinterest Search*\n🔍 Query: "${text}"`
        }, { quoted: m });

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack, query: text }, "Pinterest Search plugin error");
        await m.reply(`An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["pinterest", "pin"];
handler.tags = ["tools"];
handler.command = /^(pinterest|pin)$/i;

export default handler;
