let handler = async (m, { sock, text }) => {
    let q = m.quoted ? m.quoted : m;
    if (!q.mimetype?.includes("video") && !q.mimetype?.includes("audio")) {
        return m.reply("Reply to a video or audio to convert it to MP3.");
    }

    try {
        await global.loading(m, sock);
        let buffer = await q.download();

        const proc = Bun.spawn(
            [
                "ffmpeg",
                "-i",
                "pipe:0",
                "-vn",
                "-ac",
                "2",
                "-audio_bitrate",
                "192k",
                "-f",
                "mp3",
                "pipe:1",
            ],
            {
                stdin: "pipe",
                stdout: "pipe",
                stderr: "pipe",
            }
        );

        proc.stdin.write(buffer);
        proc.stdin.end();

        const exitCode = await proc.exited;
        if (exitCode !== 0) throw new Error("FFmpeg failed");

        const output = await new Response(proc.stdout).arrayBuffer();

        await sock.sendMessage(m.chat, {
            audio: Buffer.from(output),
            mimetype: "audio/mpeg",
            fileName: "converted.mp3"
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply("Failed to convert to audio.");
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["toaudio", "tomp3"];
handler.tags = ["tool"];
handler.command = /^(toaudio|tomp3)$/i;

export default handler;
