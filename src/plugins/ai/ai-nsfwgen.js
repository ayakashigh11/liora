/**
 * @file NSFW Image Generator AI plugin
 * @module plugins/ai/nsfwgen
 * @description Generates nsfw/illustrious images using AI via custom Danzy API
 * @license Apache-2.0
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    let prompt = text || (m.quoted && m.quoted.text);
    if (!prompt) {
        return m.reply(`Please provide a prompt or reply to a text message with the *${usedPrefix + command}* command.\nExample: *${usedPrefix + command} beautiful girl*`);
    }

    try {
        await global.loading(m, sock);

        // Call Danzy AI API
        const apiUrl = new URL("https://api.danzy.web.id/api/ai/nsfwgen");
        apiUrl.searchParams.append("q", prompt);

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
            throw new Error(`AI Service Error (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (!data.status || !data.result?.images || data.result.images.length === 0) {
            throw new Error("Failed to generate images. The AI might not have understood your prompt or the service is temporarily down.");
        }

        const images = data.result.images;

        // Send results
        if (images.length === 1) {
            await sock.sendMessage(m.chat, {
                image: { url: images[0] },
                caption: `*✨ Generated Image*\n\n*Prompt:* ${prompt}`
            }, { quoted: m });
        } else {
            // Send as album if multiple images returned
            const albumMessages = images.map((url, i) => ({
                image: { url },
                caption: `Image ${i + 1}/${images.length}\nPrompt: ${prompt}`
            }));

            await sock.client(m.chat, { album: albumMessages }, { quoted: m });
        }

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "NSFW Generator plugin error");
        await m.reply(`An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["nsfwgen"];
handler.tags = ["ai"];
handler.command = /^(nsfwgen|nsfwai|gennsfw)$/i;

export default handler;
