/**
 * @file Gemini AI plugin using custom Danzy API
 * @module plugins/ai/gemini
 * @license Apache-2.0
 */

let handler = async (m, { sock, text }) => {
    if (!text && !m.quoted?.text) {
        return m.reply("Please send a message or reply to a text message with the *.gemini* command.");
    }

    // Custom Session Cookie provided by User
    const cookieValue = "LioraXWindy";

    try {
        await global.loading(m, sock);

        let query = text || "";
        if (m.quoted && m.quoted.text) {
            query = query ? `${query}\n\nContext:\n${m.quoted.text}` : m.quoted.text;
        }

        if (!query) {
            return m.reply("No message found to process.");
        }

        // Construct Request URL
        const apiUrl = new URL("https://api.danzy.web.id/api/ai/gemini");
        apiUrl.searchParams.append("q", query);
        apiUrl.searchParams.append("cookie", cookieValue);

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Response format based on user example: data.result.response
        const resultText = data.result?.response || (typeof data.result === 'string' ? data.result : null);

        if (resultText && resultText.trim()) {
            await m.reply(resultText.trim());
        } else {
            throw new Error("Failed to get a response (empty) from the AI.");
        }

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "Gemini plugin error");
        await m.reply(`An error occurred while contacting the AI service: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["gemini"];
handler.tags = ["ai"];
handler.command = /^(gemini|ai)$/i;

export default handler;
