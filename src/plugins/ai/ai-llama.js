/**
 * @file Llama AI plugin using OpenRouter
 * @module plugins/ai/llama
 */

let handler = async (m, { sock, text }) => {
    if (!text && !m.quoted?.text) {
        return m.reply("Please provide a prompt or reply to a text message with the *.llama* command.");
    }

    const { apiKey, systemPrompt } = global.config.openrouter;
    const prompt = text || m.quoted?.text;

    try {
        await global.loading(m, sock);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://github.com/ayakashigh11/liora", // Optional
                "X-Title": "Liora Bot", // Optional
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                // We don't use stream: true here to handle the response easily in a single message
                stream: false
            })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]?.message?.content) {
            await m.reply(data.choices[0].message.content.trim());
        } else if (data.error) {
            throw new Error(data.error.message || "Unknown OpenRouter error");
        } else {
            throw new Error("Invalid response from OpenRouter API");
        }

    } catch (e) {
        console.error(e);
        await m.reply(`An error occurred while contacting Llama AI: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["llama"];
handler.tags = ["ai"];
handler.command = /^(llama)$/i;

export default handler;
