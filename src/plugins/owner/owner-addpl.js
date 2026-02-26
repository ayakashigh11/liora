/**
 * @file Add plugin command handler
 * @module plugins/owner/addpl
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { join, resolve, dirname, basename } from "node:path";
import { mkdir } from "node:fs/promises";

let handler = async (m, { sock, args, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!/application\/javascript|text\/javascript/.test(mime) && !q.fileName?.endsWith(".js")) {
        return m.reply(`Reply to a .js file or upload it with category.\n\nUsage: ${usedPrefix + command} <category>\nExample: ${usedPrefix + command} tools`);
    }

    if (!args[0]) {
        return m.reply(`Please provide a category.\nExample: ${usedPrefix + command} tools`);
    }

    const category = args[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    const pluginDir = join(global.pluginFolder, category);

    try {
        await mkdir(pluginDir, { recursive: true });

        const buf = await q.download().catch(() => null);
        if (!buf) return m.reply("Failed to download the plugin file.");

        const filename = q.fileName ? basename(q.fileName) : `plugin-${Date.now()}.js`;
        const filePath = resolve(pluginDir, filename);

        await Bun.write(filePath, buf);

        // Reload plugins to register the new one
        await global.reloadAllPlugins();
        await global.reloadHandler();

        m.reply(`Successfully added plugin *${filename}* to category *${category}*.\n\nPath: src/plugins/${category}/${filename}`);
    } catch (e) {
        m.reply(`Error adding plugin: ${e.message}`);
    }
};

handler.help = ["addpl"];
handler.tags = ["owner"];
handler.command = /^(addpl)$/i;
handler.owner = true;

export default handler;
