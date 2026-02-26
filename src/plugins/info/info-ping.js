import os from "node:os";

/**
 * Formats bytes to a human-readable string.
 * @param {number} bytes 
 * @returns {string}
 */
const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Formats uptime seconds to a human-readable string.
 * @param {number} seconds 
 * @returns {string}
 */
const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    return parts.join(" ") || "0s";
};

let handler = async (m, { sock }) => {
    const start = Bun.nanoseconds();

    // System Information
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsage = ((usedMem / totalMem) * 100).toFixed(1);

    const cpus = os.cpus();
    const cpuModel = cpus[0]?.model || "Unknown CPU";
    const cpuCount = cpus.length;
    const loadAvg = os.loadavg();

    let diskStats = "N/A";
    try {
        const df = Bun.spawnSync(["df", "-h", "/"]);
        const lines = df.stdout.toString().split("\n");
        if (lines[1]) {
            const parts = lines[1].split(/\s+/);
            diskStats = `${parts[2]} / ${parts[1]} (${parts[4]})`;
        }
    } catch {
        // Fallback for non-linux or failed spawn
    }

    const uptime = formatUptime(os.uptime());
    const osType = os.type();
    const osRel = os.release();

    const pingNs = Bun.nanoseconds() - start;
    const pingMs = (pingNs / 1_000_000).toFixed(2);

    const caption = `
🚀 *LIORA SYSTEM MONITOR* 🚀

*📊 Performance*
• ⏳ *Ping:* \`${pingMs} ms\`
• ⏱️ *Uptime:* \`${uptime}\`

*💻 Server Specs*
• 🧠 *CPU:* \`${cpuCount}x ${cpuModel}\`
• ⚙️ *Load:* \`${loadAvg[0].toFixed(2)}, ${loadAvg[1].toFixed(2)}, ${loadAvg[2].toFixed(2)}\`
• 📟 *RAM:* \`${formatBytes(usedMem)} / ${formatBytes(totalMem)} (${memUsage}%)\`
• 💾 *Disk:* \`${diskStats}\`

*🌐 Environment*
• 🐧 *OS:* \`${osType} ${osRel}\`
• 📦 *Runtime:* \`Bun ${Bun.version}\`
`.trim();

    // The banner was generated and saved to the brain directory.
    // In a real scenario, this would be a URL or a static asset.
    const bannerUrl = "https://files.catbox.moe/3xv7p0.png"; // Fallback to liora banner if local path is unavailable

    await sock.sendMessage(m.chat, {
        image: { url: bannerUrl },
        caption: caption,
        contextInfo: {
            externalAdReply: {
                title: "Liora Server Health",
                body: "Status: Online",
                mediaType: 1,
                thumbnailUrl: bannerUrl,
                renderLargerThumbnail: true,
                sourceUrl: "https://github.com/ayakashigh11/liora"
            }
        }
    }, { quoted: m });
};

handler.help = ["ping"];
handler.tags = ["info"];
handler.command = /^(ping)$/i;

export default handler;
