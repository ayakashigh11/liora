/**
 * @file Anti-Delete & Anti-Edit command handler
 * @module plugins/tool/antidel
 * @description View logs of deleted/edited messages and manage blacklist
 * @license Apache-2.0
 */

import { getLogs, addBlacklist, delBlacklist, listBlacklist } from "#lib/antidelete.js";

let handler = async (m, { sock, text, usedPrefix, command, args }) => {
    const action = (args[0] || "").toLowerCase();

    switch (action) {
        case "logs":
        case "list":
        case "log": {
            const page = parseInt(args[1]) || 1;
            const limit = 10;
            const logs = getLogs(page, limit);

            if (logs.length === 0) {
                return m.reply(`*ANTI-DELETE LOGS*\n\nNo logs found on page ${page}.`);
            }

            let txt = `*ANTI-DELETE LOGS (Page ${page})*\n\n`;
            logs.forEach((log, i) => {
                const time = new Date(log.time * 1000).toLocaleString();
                txt += `${(page - 1) * limit + i + 1}. *[${log.type.toUpperCase()}]*\n`;
                txt += `│ • *User:* ${log.push_name} (@${log.sender_id.split("@")[0]})\n`;
                txt += `│ • *Chat:* ${log.chat_id}\n`;
                txt += `│ • *Time:* ${time}\n`;
                txt += `│ • *Content:* ${log.content}\n`;
                txt += `╰──────────────────\n\n`;
            });

            txt += `Use *${usedPrefix + command} logs ${page + 1}* for next page.`;

            await sock.sendMessage(m.chat, {
                text: txt,
                contextInfo: { mentionedJid: logs.map(l => l.sender_id) }
            }, { quoted: m });
            break;
        }

        case "addbl": {
            const target = args[1] || m.chat;
            if (addBlacklist(target)) {
                m.reply(`✅ Chat *${target}* has been added to Anti-Delete blacklist.`);
            } else {
                m.reply(`❌ Failed to add chat to blacklist.`);
            }
            break;
        }

        case "delbl": {
            const target = args[1] || m.chat;
            if (delBlacklist(target)) {
                m.reply(`✅ Chat *${target}* has been removed from Anti-Delete blacklist.`);
            } else {
                m.reply(`❌ Failed to remove chat from blacklist.`);
            }
            break;
        }

        case "listbl": {
            const bl = listBlacklist();
            if (bl.length === 0) {
                return m.reply(`*ANTI-DELETE BLACKLIST*\n\nBlacklist is empty.`);
            }
            let txt = `*ANTI-DELETE BLACKLIST*\n\n`;
            bl.forEach((id, i) => {
                txt += `${i + 1}. ${id}\n`;
            });
            m.reply(txt);
            break;
        }

        default: {
            m.reply(
                `*ANTI-DELETE SYSTEM*\n\n` +
                `*Sub-commands:*\n` +
                `│ • *${usedPrefix + command} logs [page]* - View logs\n` +
                `│ • *${usedPrefix + command} addbl [jid]* - Blacklist current/target chat\n` +
                `│ • *${usedPrefix + command} delbl [jid]* - Remove from blacklist\n` +
                `│ • *${usedPrefix + command} listbl* - View blacklisted chats\n\n` +
                `*Note:* Logs are stored silently for groups/chats not in the blacklist.`
            );
            break;
        }
    }
};

handler.help = ["antidel", "antidelete"];
handler.tags = ["tools"];
handler.command = /^(antidel|antidelete)$/i;

export default handler;
