/**
 * @file NIK Checker plugin
 * @module plugins/tool/nik
 * @description Fetches details about an Indonesian NIK KTP
 * @license Apache-2.0
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    let nik = text || (m.quoted && m.quoted.text);
    if (!nik) return m.reply(`Please provide a NIK or reply to a message containing a NIK with the *${usedPrefix + command}* command.`);

    // Basic cleaning (remove non-digits)
    nik = nik.replace(/\D/g, '');

    if (nik.length < 16) {
        return m.reply("NIK must be 16 digits long.");
    }

    try {
        await global.loading(m, sock);

        const response = await fetch(`https://api.danzy.web.id/api/tools/nik?nik=${nik}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.status || !data.result) {
            return m.reply("Failed to retrieve NIK data. Please ensure the NIK is valid.");
        }

        const res = data.result.data;
        const meta = data.result.metadata;

        let txt = `*🔍 NIK CHECKER DETAILS*\n\n`;
        txt += `*• NIK:* ${nik}\n`;
        txt += `*• Name:* ${res.nama}\n`;
        txt += `*• Gender:* ${res.kelamin}\n`;
        txt += `*• Birth Details:* ${res.tempat_lahir}\n`;
        txt += `*• Age:* ${res.usia}\n\n`;

        txt += `*📍 LOCATION*\n`;
        txt += `*• Province:* ${res.provinsi}\n`;
        txt += `*• Regency:* ${res.kabupaten}\n`;
        txt += `*• District:* ${res.kecamatan}\n`;
        txt += `*• Village:* ${res.kelurahan}\n`;
        txt += `*• Polling Station:* ${res.tps}\n`;
        txt += `*• Address:* ${res.alamat}\n\n`;

        txt += `*✨ OTHERS*\n`;
        txt += `*• Zodiak:* ${res.zodiak}\n`;
        txt += `*• Javanese Date (Weton):* ${res.pasaran}\n`;
        txt += `*• Upcoming Birthday:* ${res.ultah_mendatang}\n\n`;

        txt += `_Metadata Timestamp: ${meta.timestamp}_`;

        await m.reply(txt.trim());

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "NIK plugin error");
        await m.reply(`An error occurred while checking NIK: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["nik"];
handler.tags = ["tools"];
handler.command = /^(nik)$/i;

export default handler;
