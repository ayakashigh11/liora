import { addReminder } from "#lib/reminder.js";

let handler = async (m, { text }) => {
    if (!text) return m.reply("Usage: .reminder <time><suffix> <message>\nExample: .reminder 10m buy milk\nSuffixes: s (seconds), m (minutes), h (hours), d (days)");

    let [_, timeRaw, msg] = text.match(/^(\d+[smhd])\s+(.+)$/i) || [];
    if (!timeRaw || !msg) return m.reply("Invalid format. Use `.reminder 10m message`.");

    let seconds = 0;
    let val = parseInt(timeRaw);
    let suffix = timeRaw.slice(-1).toLowerCase();

    if (suffix === 's') seconds = val;
    else if (suffix === 'm') seconds = val * 60;
    else if (suffix === 'h') seconds = val * 3600;
    else if (suffix === 'd') seconds = val * 86400;

    addReminder(m.sender, m.chat, msg, seconds);
    m.reply(`✅ Reminder set for ${timeRaw} from now.`);
};

handler.help = ["reminder"];
handler.tags = ["tool"];
handler.command = /^(reminder)$/i;

export default handler;
