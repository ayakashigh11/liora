import { sticker } from "#lib/sticker.js";

let handler = async (m, { sock }) => {
    let q = m.quoted ? m.quoted : m;
    if (!q.mimetype?.includes("image")) {
        return m.reply("Please send or reply to an image to make a circular sticker.");
    }

    try {
        await global.loading(m, sock);
        let img = await q.download();
        let result = await sticker(img, {
            circle: true,
            packName: global.config.stickpack,
            authorName: global.config.stickauth
        });

        await m.reply(result, { asSticker: true });
    } catch (e) {
        console.error(e);
        m.reply("Failed to create circular sticker.");
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["scircle"];
handler.tags = ["maker"];
handler.command = /^(scircle|circle)$/i;

export default handler;
