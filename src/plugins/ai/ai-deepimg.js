/**
 * @file DeepImg AI image generation plugin
 * @module plugins/ai/deepimg
 * @license Apache-2.0
 * @author ayakashigh11
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Please provide a prompt to generate an image.\n\n*Usage:* ${usedPrefix + command} <prompt>`);
    }

    try {
        await global.loading(m, sock);

        const apiUrl = `https://api.nexray.web.id/ai/deepimg?prompt=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!res.ok) throw new Error(`Nexray API error: ${res.status} ${res.statusText}`);

        // Nexray AI image endpoints usually return the image directly or a JSON with result.
        // We've seen 'result' pattern in other AI plugins from this provider.
        const contentType = res.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            if (data.status && data.result) {
                await sock.sendMessage(m.chat, {
                    image: { url: data.result },
                    caption: `*DEEPIMG SUCCESS*\n\nPrompt: ${text}\n\n> Powered by Liora`
                }, { quoted: m });
            } else {
                throw new Error(data.message || "Invalid response format from Nexray API");
            }
        } else {
            // Assume it's an image buffer if not JSON
            const buffer = Buffer.from(await res.arrayBuffer());
            if (buffer.length < 100) throw new Error("Invalid image buffer received");

            await sock.sendMessage(m.chat, {
                image: buffer,
                caption: `*DEEPIMG SUCCESS*\n\nPrompt: ${text}\n\n> Powered by Liora`
            }, { quoted: m });
        }

    } catch (e) {
        sock.logger.error("DeepImg plugin error:", e);
        await m.reply(`An error occurred while generating the image: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["deepimg"];
handler.tags = ["ai"];
handler.command = /^(deepimg)$/i;

export default handler;
