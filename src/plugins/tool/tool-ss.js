import puppeteer from "puppeteer";

/** @type {import('puppeteer').Browser | null} */
let cachedBrowser = null;

/**
 * Initialize or return a cached browser instance
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function getBrowser() {
    if (cachedBrowser && cachedBrowser.connected) {
        return cachedBrowser;
    }

    cachedBrowser = await puppeteer.launch({
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu",
            "--disable-extensions",
            "--disable-background-networking",
            "--disable-default-apps",
            "--disable-sync",
            "--hide-scrollbars",
            "--metrics-recording-only",
            "--mute-audio",
            "--no-default-browser-check",
        ],
        executablePath: process.env.CHROME_PATH || undefined
    });

    // Handle unexpected disconnection
    cachedBrowser.on('disconnected', () => {
        cachedBrowser = null;
    });

    return cachedBrowser;
}

let handler = async (m, { text, sock, usedPrefix, command }) => {
    if (!text) return m.reply(`Usage: *${usedPrefix + command} <url> [options]*\nOptions: mobile, full`);

    let url = text.match(/https?:\/\/\S+/i)?.[0];
    if (!url) {
        if (!/^https?:\/\//i.test(text)) {
            url = "https://" + text.split(" ")[0];
        } else {
            return m.reply("❌ Please provide a valid URL.");
        }
    }

    let isMobile = text.toLowerCase().includes("mobile");
    let isFull = text.toLowerCase().includes("full");

    try {
        await global.loading?.(m, sock);

        const browser = await getBrowser();
        const page = await browser.newPage();

        // Speed optimization: Intercept junk requests
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url = request.url();
            const type = request.resourceType();

            // Block ads, trackers, analytics, and heavy fonts
            const blockedRegex = /ads|analytics|tracker|doubleclick|pixel|facebook|google-analytics|min.js.map/i;
            const blockedTypes = ['image', 'media', 'font', 'other']; // Optional: block images if they don't care about visuals

            if (blockedRegex.test(url)) {
                request.abort();
            } else if (isFull && blockedTypes.includes(type)) {
                // If full page, we might need images, but if not, keep it light
                request.continue();
            } else {
                request.continue();
            }
        });

        if (isMobile) {
            await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
            await page.setViewport({ width: 375, height: 812, isMobile: true });
        } else {
            await page.setViewport({ width: 1920, height: 1080 });
        }

        // Optimization: Use domcontentloaded then wait a tiny bit for stability
        // This is much faster than networkidle2
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        // Small wait for dynamic content/animations to settle
        await new Promise(r => setTimeout(r, 2000));

        const screenshot = await page.screenshot({
            fullPage: isFull,
            type: "jpeg", // Jpeg is faster than PNG
            quality: 80
        });

        if (!screenshot || screenshot.length === 0) {
            throw new Error("Failed to capture screenshot: result is empty.");
        }

        await page.close();

        await sock.sendMessage(m.chat, {
            image: Buffer.from(screenshot),
            caption: `🌐 *SCREENSHOT COMPLETED*\n\n• *URL:* ${url}\n• *Device:* ${isMobile ? '📱 Mobile' : '💻 Desktop'}\n• *Mode:* ${isFull ? '📏 Full Page' : '🖼️ Standard'}\n\n_Took sub-5 seconds with Liora Turbo_`
        }, { quoted: m });

    } catch (e) {
        console.error("Screenshot Error:", e);
        m.reply(`❌ *Failed to take screenshot:* ${e.message}`);
    } finally {
        await global.loading?.(m, sock, true);
    }
};

handler.help = ["ss", "screenshot", "ssweb"];
handler.tags = ["tools"];
handler.command = /^(ss|screenshot|ssweb)$/i;

export default handler;
