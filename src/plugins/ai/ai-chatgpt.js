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

        // Send request to OpenRouter using direct fetch for reliability
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://github.com/ayakashigh11/liora", // Optional but helps
                "X-Title": "Liora Bot"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo", // Switching to 3.5 turbo for better compatibility check
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const fullResponse = data.choices[0]?.message?.content || "";

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
