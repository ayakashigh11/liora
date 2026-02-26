import { webpToMp4 } from "#lib/sticker.js";

let handler = async (m, { sock }) => {
    if (!m.quoted || !m.quoted.mimetype?.includes("webp")) {
        return m.reply("Reply to an animated sticker to convert it to video.");
    }

    try {
        await global.loading(m, sock);
        let img = await m.quoted.download();
        let result = await webpToMp4(img);

        await sock.sendMessage(m.chat, {
            video: result,
            mimetype: "video/mp4",
            caption: "Successfully converted sticker to video"
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply("Failed to convert sticker to video. Ensure it's an animated sticker.");
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["tovideo"];
handler.tags = ["maker"];
handler.command = /^(tovideo|tomp4)$/i;

export default handler;
