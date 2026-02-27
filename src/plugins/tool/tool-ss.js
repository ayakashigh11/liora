import puppeteer from "puppeteer";

let handler = async (m, { text, sock }) => {
    if (!text) return m.reply("Usage: .ss <url> [options]\nOptions: mobile, full");

    let url = text.match(/https?:\/\/\S+/i)?.[0];
    if (!url) return m.reply("Invalid URL.");

    let isMobile = text.toLowerCase().includes("mobile");
    let isFull = text.toLowerCase().includes("full");

    try {
        await global.loading(m, sock);
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();

        if (isMobile) {
            await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
            await page.setViewport({ width: 375, height: 812, isMobile: true });
        } else {
            await page.setViewport({ width: 1920, height: 1080 });
        }

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        const screenshot = await page.screenshot({
            fullPage: isFull,
            type: "png"
        });

        await browser.close();

        await sock.sendMessage(m.chat, {
            image: screenshot,
            caption: `🌐 *Screenshot Results*\nURL: ${url}\nMode: ${isMobile ? 'Mobile' : 'Desktop'}\nFull: ${isFull ? 'Yes' : 'No'}`
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply(`Failed to take screenshot: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["ss", "screenshot", "ssweb"];
handler.tags = ["tool"];
handler.command = /^(ss|screenshot|ssweb)$/i;

export default handler;
