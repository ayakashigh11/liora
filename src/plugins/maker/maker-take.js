import { addExif } from "#lib/sticker.js";

let handler = async (m, { text }) => {
    if (!m.quoted || !m.quoted.mimetype?.includes("webp")) {
        return m.reply("Reply to a sticker to change its metadata.");
    }

    let [pack, auth] = text.split("|").map(v => v.trim());
    if (!pack && !auth) {
        return m.reply(`Usage: .take <packname>|<author>\nExample: .take MyPack | Liora`);
    }

    try {
        await global.loading(m, sock);
        let img = await m.quoted.download();
        let result = await addExif(img, {
            packName: pack || global.config.stickpack,
            packPublish: auth || global.config.stickauth
        });

        await m.reply(result, { asSticker: true });
    } catch (e) {
        console.error(e);
        m.reply("Failed to update sticker metadata.");
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["take"];
handler.tags = ["maker"];
handler.command = /^(take|wm)$/i;

export default handler;
