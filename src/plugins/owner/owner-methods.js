/**
 * @file Bug methods list command
 * @module plugins/owner/methods
 */

import { bugMethods } from "#lib/bug.js";

let handler = async (m) => {
    const list = Object.keys(bugMethods);
    const caption = `📊 *LIORA BUG METHODS*\n\n` +
        list.map((v, i) => `${i + 1}. \`${v}\``).join("\n") +
        `\n\n*Usage:* .send <number> <method>`;

    await m.reply(caption);
};

handler.help = ["methods"];
handler.tags = ["owner"];
handler.command = /^(methods)$/i;
handler.owner = true;

export default handler;
