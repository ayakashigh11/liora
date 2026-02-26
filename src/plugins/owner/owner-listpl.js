/**
 * @file List plugins command handler
 * @module plugins/owner/listpl
 * @license Apache-2.0
 * @author ayakashigh11
 */

import { readdir } from "node:fs/promises";
import { join } from "node:path";

let handler = async (m, { usedPrefix, command }) => {
    try {
        const categories = await readdir(global.pluginFolder, { withFileTypes: true });
        let text = "*LIST PLUGINS*\n\n";

        for (const cat of categories) {
            if (cat.isDirectory()) {
                const catPath = join(global.pluginFolder, cat.name);
                const files = await readdir(catPath);
                const jsFiles = files.filter(f => f.endsWith(".js"));

                if (jsFiles.length > 0) {
                    text += `*${cat.name.toUpperCase()}*\n`;
                    text += jsFiles.map(f => `│ • ${f}`).join("\n") + "\n\n";
                }
            }
        }

        m.reply(text.trim());
    } catch (e) {
        m.reply(`Error listing plugins: ${e.message}`);
    }
};

handler.help = ["listpl"];
handler.tags = ["owner"];
handler.command = /^(listpl|lspl)$/i;
handler.owner = true;

export default handler;
