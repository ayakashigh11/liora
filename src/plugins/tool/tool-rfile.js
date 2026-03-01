/**
 * @file Read File command handler
 * @module plugins/tool/rfile
 * @description Extracts and displays text content from document messages
 * @license Apache-2.0
 * @author ayakashigh11
 */

import fs from 'node:fs/promises';

/**
 * Format bytes to readable size
 * @param {number} bytes 
 * @returns {string}
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

let handler = async (m, { sock, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    // Check if it's a document
    if (!/document|text|javascript|json/.test(mime) && q.mtype !== 'documentMessage') {
        return m.reply(`Please reply to a document/file or send a file with *${usedPrefix + command}* to read its content.`);
    }

    try {
        const fileName = (q.msg || q).fileName || 'file.txt';
        const fileSize = (q.msg || q).fileLength ? parseInt((q.msg || q).fileLength.toString()) : 0;

        // Download the file
        const buffer = await q.download?.();
        if (!buffer || buffer.length === 0) {
            throw new Error("Failed to download or empty file.");
        }

        // Convert to string
        let content = buffer.toString('utf-8');

        // Remove null bytes and non-printable characters if it looks like binary
        content = content.replace(/[^\x20-\x7E\n\t\r]/g, '');

        if (!content.trim()) {
            return m.reply("❌ The file appears to be empty or contains no readable text.");
        }

        const statsStr = `📄 *FILE READER*\n\n` +
            `• *Name:* ${fileName}\n` +
            `• *Size:* ${formatBytes(fileSize)}\n` +
            `• *Length:* ${content.length.toLocaleString()} chars\n` +
            `──────────────────────────\n\n`;

        // WhatsApp message limit is roughly 40k-65k chars depending on device
        // We truncate at 30k to be safe and avoid lag/crash
        const MAX_CHARS = 30000;
        let isTruncated = false;
        if (content.length > MAX_CHARS) {
            content = content.slice(0, MAX_CHARS);
            isTruncated = true;
        }

        let result = statsStr + "```\n" + content + "\n```";

        if (isTruncated) {
            result += `\n\n⚠️ _Content truncated for performance (Max ${MAX_CHARS.toLocaleString()} chars)_`;
        }

        await m.reply(result);

    } catch (e) {
        global.logger.error({ error: e.message, stack: e.stack }, "Read File Error");
        m.reply(`❌ Error reading file: ${e.message}`);
    }
};

handler.help = ["rfile", "readfile"];
handler.tags = ["tools"];
handler.command = /^(rfile|readfile)$/i;

handler.settings = {
    loading: true
};

export default handler;
