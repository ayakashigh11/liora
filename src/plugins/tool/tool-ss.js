import puppeteer from "puppeteer";

/** @type {import('puppeteer').Browser | null} */
let cachedBrowser = null;
let browserPromise = null;

/**
 * Initialize or return a cached browser instance with race-condition protection
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function getBrowser() {
    if (cachedBrowser && cachedBrowser.connected) {
        return cachedBrowser;
    }

    if (browserPromise) {
        return browserPromise;
    }

    browserPromise = (async () => {
        try {
            const browser = await puppeteer.launch({
                headless: "new",
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
                    "--single-process", // Try to run in a single process if supported (Linux)
                    "--disable-setuid-sandbox",
                    "--no-first-run",
                    "--disable-dev-shm-usage",
                    "--disable-software-rasterizer",
                    "--disable-features=IsolateOrigins,site-per-process",
                    "--disable-ipc-flooding-protection"
                ],
                executable_path: process.env.CHROME_PATH || undefined
            });

            cachedBrowser = browser;
            browser.on('disconnected', () => {
                cachedBrowser = null;
                browserPromise = null;
            });

            return browser;
        } catch (e) {
            browserPromise = null;
            throw e;
        }
    })();

    return browserPromise;
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

    let page = null;
    try {
        await global.loading?.(m, sock);

        const browser = await getBrowser();
        page = await browser.newPage();

        // Set timeouts to prevent infinite hanging
        page.setDefaultNavigationTimeout(20000);
        page.setDefaultTimeout(25000);

        // Speed optimization: Intercept junk requests
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            try {
                if (request.isInterceptResolutionHandled()) return;

                const url = request.url();
                const type = request.resourceType();

                // Block ads, trackers, analytics, and heavy fonts
                const blockedRegex = /ads|analytics|tracker|doubleclick|pixel|facebook|google-analytics|min.js.map/i;
                // Unconditionally block fonts and media for speed
                const blockedTypes = ['font', 'media', 'other'];

                if (blockedRegex.test(url) || blockedTypes.includes(type)) {
                    request.abort().catch(() => { });
                } else {
                    request.continue().catch(() => { });
                }
            } catch (e) {
                request.continue().catch(() => { });
            }
        });

        if (isMobile) {
            await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
            await page.setViewport({ width: 375, height: 812, isMobile: true });
        } else {
            await page.setViewport({ width: 1440, height: 900 });
        }

        // Optimization: Use 'load' for speed, fallback to 'domcontentloaded' if it hangs
        await page.goto(url, {
            waitUntil: "load",
            timeout: 20000
        }).catch(async () => {
            // Fallback if 'load' is too slow
            return page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 }).catch(() => { });
        });

        // Minimum wait for stability
        await new Promise(r => setTimeout(r, 1500));

        const screenshot = await page.screenshot({
            fullPage: isFull,
            type: "png"
        });

        if (!screenshot || screenshot.length === 0) {
            throw new Error("Failed to capture screenshot: result is empty.");
        }

        // Important: Close page BEFORE sending message to free memory early
        await page.close();
        page = null;

        await sock.sendMessage(m.chat, {
            image: screenshot,
            caption: `🌐 *SCREENSHOT COMPLETED*\n\n• *URL:* ${url}\n• *Device:* ${isMobile ? '📱 Mobile' : '💻 Desktop'}\n• *Quality:* HD (PNG)\n\n_Generated by Liora Turbo_`
        }, { quoted: m });

    } catch (e) {
        console.error("Screenshot Error:", e);
        m.reply(`❌ *Failed to take screenshot:* ${e.message}`);
    } finally {
        if (page) await page.close().catch(() => { });
        await global.loading?.(m, sock, true);
    }
};

handler.help = ["ss", "screenshot", "ssweb"];
handler.tags = ["tools"];
handler.command = /^(ss|screenshot|ssweb)$/i;

export default handler;
