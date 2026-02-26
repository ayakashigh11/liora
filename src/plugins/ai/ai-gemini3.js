/**
 * @file Gemini3 AI plugin using Nexray API
 * @module plugins/ai/gemini3
 * @license Apache-2.0
 * @author ayakashigh11
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    const q = m.quoted || m;
    let prompt = text || "";

    // If replying to a text message, append its content
    if (m.quoted?.text) {
        prompt = prompt ? `${prompt}\n\nContext:\n${m.quoted.text}` : m.quoted.text;
    }

    // If replying to a document/file, try to read it as text
    if (m.quoted && m.quoted.mimetype) {
        const mime = m.quoted.mimetype;
        const isTextFile = /text|json|javascript|typescript|markdown|plain/.test(mime) ||
            /\.(txt|js|md|json|ts|html|css|py|sh)$/i.test(m.quoted.msg?.fileName || "");

        if (isTextFile) {
            try {
                const buffer = await m.quoted.download();
                if (buffer && buffer.length > 0) {
                    const fileContent = buffer.toString('utf-8');
                    prompt = prompt
                        ? `${prompt}\n\nFile Content (${m.quoted.msg?.fileName || "unnamed"}):\n${fileContent}`
                        : fileContent;
                }
            } catch (err) {
                sock.logger.error("Failed to read quoted file for Gemini3:", err);
            }
        }
    }

    if (!prompt.trim()) {
        return m.reply(`Please provide a prompt or reply to a text/file with the *${usedPrefix + command}* command.`);
    }

    try {
        await global.loading(m, sock);

        const apiUrl = `https://api.nexray.web.id/ai/gemini?text=${encodeURIComponent(prompt)}`;
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!res.ok) throw new Error(`Nexray API error: ${res.status} ${res.statusText}`);

        const data = await res.json();

        if (data.status && data.result) {
            await m.reply(data.result.trim());
        } else {
            throw new Error(data.message || "Invalid or empty response from Nexray API");
        }

    } catch (e) {
        sock.logger.error("Gemini3 plugin error:", e);
        await m.reply(`An error occurred while contacting Gemini3: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["gemini3"];
handler.tags = ["ai"];
handler.command = /^(gemini3)$/i;

export default handler;
