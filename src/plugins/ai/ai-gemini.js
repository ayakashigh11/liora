import { GoogleGenerativeAI } from "@google/generative-ai";

let handler = async (m, { sock, text }) => {
    if (!text && !m.quoted?.mimetype?.includes("image") && !m.mimetype?.includes("image")) {
        return m.reply("Kirim pesan atau balas gambar dengan perintah *.gemini*");
    }

    const { apiKey, systemPrompt } = global.config.gemini;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: systemPrompt
    });

    try {
        await global.loading(m, sock);

        let prompt = [text || "Jelaskan gambar ini"];
        let q = m.quoted ? m.quoted : m;

        if (q.mimetype?.includes("image")) {
            let imgData = await q.download();
            prompt.push({
                inlineData: {
                    data: imgData.toString("base64"),
                    mimeType: "image/jpeg"
                }
            });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const resultText = response.text();

        await m.reply(resultText);
    } catch (e) {
        console.error(e);
        await m.reply("Terjadi kesalahan saat menghubungi Gemini AI. Pastikan API Key valid dan coba lagi nanti.");
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["gemini"];
handler.tags = ["ai"];
handler.command = /^(gemini|ai)$/i;

export default handler;
