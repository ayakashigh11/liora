/**
 * @file Delete plugin command handler
 * @module plugins/owner/delpl
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { join, resolve, extname } from "node:path";
import { unlink } from "node:fs/promises";

let handler = async (m, { usedPrefix, command, args }) => {
    if (args.length < 2) {
        return m.reply(`Usage: ${usedPrefix + command} <category> <filename>\nExample: ${usedPrefix + command} tools my-plugin.js`);
    }

    const category = args[0].toLowerCase();
    let filename = args[1];
    if (!filename.endsWith(".js")) filename += ".js";

    const filePath = resolve(global.pluginFolder, category, filename);
    const file = Bun.file(filePath);

    try {
        if (!(await file.exists())) {
            return m.reply(`Plugin not found: src/plugins/${category}/${filename}`);
        }

        await unlink(filePath);

        // Reload plugins to reflect changes
        await global.reloadAllPlugins();
        await global.reloadHandler();

        m.reply(`Successfully deleted plugin *${filename}* from category *${category}*.`);
    } catch (e) {
        m.reply(`Error deleting plugin: ${e.message}`);
    }
};

handler.help = ["delpl"];
handler.tags = ["owner"];
handler.command = /^(delpl|rmpl)$/i;
handler.owner = true;

export default handler;
