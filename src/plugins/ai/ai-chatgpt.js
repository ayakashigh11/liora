/**
 * @file ChatGPT AI plugin using OpenRouter SDK
 * @module plugins/ai/chatgpt
 * @license Apache-2.0
 */

import { OpenRouter } from "@openrouter/sdk";

let handler = async (m, { sock, text }) => {
    // If no text and no quoted text/document, prompt user
    if (!text && !m.quoted?.text && !m.quoted?.download) {
        return m.reply("Please provide a prompt or reply to a text/document with the *.chatgpt* command.");
    }

    const { apiKey, systemPrompt } = global.config.openrouter;

    // Initialize OpenRouter
    const openrouter = new OpenRouter({
        apiKey: apiKey
    });

    try {
        await global.loading(m, sock);

        let prompt = text || "";

        // Handle quoted content
        if (m.quoted) {
            if (m.quoted.text) {
                // If it's a text reply, append or use as prompt
                prompt = prompt ? `${prompt}\n\nContext:\n${m.quoted.text}` : m.quoted.text;
            } else if (m.quoted.download) {
                // If it's a document/media, try to extract text if possible
                // For simplicity, we prioritize text. If it's a file, we download and read
                try {
                    const buffer = await m.quoted.download();
                    if (buffer && buffer.length > 0) {
                        const content = buffer.toString("utf-8");
                        // Only use if it looks like text (basic check)
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

        // Send request to OpenRouter
        const stream = await openrouter.chat.send({
            chatGenerationParams: {
                model: "openai/gpt-oss-120b:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
            },
            stream: true
        });

        let fullResponse = "";

        // Accumulate stream
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                fullResponse += content;
            }
        }

        if (fullResponse.trim()) {
            await m.reply(fullResponse.trim());
        } else {
            throw new Error("Empty response from AI");
        }

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "ChatGPT plugin error");
        await m.reply(`An error occurred while contacting ChatGPT: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["chatgpt"];
handler.tags = ["ai"];
handler.command = /^(chatgpt|gpt)$/i;

export default handler;
