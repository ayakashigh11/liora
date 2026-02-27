/**
 * @file ChatGPT AI plugin using custom FAA API
 * @module plugins/ai/chatgpt
 * @license Apache-2.0
 */

let handler = async (m, { sock, text }) => {
    // If no text and no quoted text/document, prompt user
    if (!text && !m.quoted?.text && !m.quoted?.download) {
        return m.reply("Please provide a prompt or reply to a text/document with the *.chatgpt* command.");
    }

    const { systemPrompt } = global.config.openrouter || { systemPrompt: "You are Liora, a helpful assistant." };

    try {
        await global.loading(m, sock);

        let prompt = text || "";

        // Handle quoted content
        if (m.quoted) {
            if (m.quoted.text) {
                prompt = prompt ? `${prompt}\n\nContext:\n${m.quoted.text}` : m.quoted.text;
            } else if (m.quoted.download) {
                try {
                    const buffer = await m.quoted.download();
                    if (buffer && buffer.length > 0) {
                        const content = buffer.toString("utf-8");
                        if (!/[\x00-\x08\x0E-\x1F]/.test(content.slice(0, 100))) {
                            prompt = prompt ? `${prompt}\n\nFile Content:\n${content}` : content;
                        }
                    }
                } catch (e) {
                    global.logger.error({ error: e.message }, "Failed to read quoted file for chatgpt");
                }
            }
        }

        if (!prompt) {
            return m.reply("No usable prompt found.");
        }

        // Construct Request URL
        const apiUrl = new URL("https://api-faa.my.id/faa/gpt-promt");
        apiUrl.searchParams.append("prompt", systemPrompt);
        apiUrl.searchParams.append("text", prompt);

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Handle result (assuming the API returns JSON with a result field or similar)
        // Adjusting based on common API patterns for these domains
        const result = data.result || data.response || data.text || (typeof data === 'string' ? data : JSON.stringify(data));

        if (result && result.trim()) {
            await m.reply(result.trim());
        } else {
            throw new Error("Empty response from AI");
        }

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "ChatGPT plugin error");
        await m.reply(`An error occurred while contacting the AI service: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["chatgpt"];
handler.tags = ["ai"];
handler.command = /^(chatgpt|gpt)$/i;

export default handler;
