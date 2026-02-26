import { getStats } from "#lib/tracker.js";
import os from "node:os";

let handler = async (m, { sock }) => {
    let { topCommands, topUsers, totalCommands } = getStats();
    let uptime = process.uptime();

    let text = `🚀 *Liora System Statistics*\n\n`;
    text += `*Total Commands:* ${totalCommands.toLocaleString()}\n`;
    text += `*Runtime:* ${formatDuration(uptime)}\n\n`;

    if (topCommands.length > 0) {
        text += `📊 *Top Commands:*\n`;
        text += topCommands.map((c, i) => `${i + 1}. .${c.command} (${c.count})`).join("\n") + "\n\n";
    }

    if (topUsers.length > 0) {
        text += `👥 *Top Users:*\n`;
        text += topUsers.map((u, i) => `${i + 1}. @${u.user_id.split("@")[0]} (${u.count})`).join("\n") + "\n\n";
    }

    await sock.sendMessage(m.chat, {
        text,
        contextInfo: {
            mentionedJid: topUsers.map(u => u.user_id),
            externalAdReply: {
                title: "LIORA PERFORMANCE MONITOR",
                body: "Enterprise Message Routing System",
                thumbnailUrl: global.config.thumbnailUrl,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

function formatDuration(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

handler.help = ["stats"];
handler.tags = ["info"];
handler.command = /^(stats|status)$/i;

export default handler;
