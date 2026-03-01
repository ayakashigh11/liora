/**
 * @file Advanced Screenshot Plugin
 * @module plugins/tool/ss
 * @description Capture website screenshots with stealth and multi-device support
 * @license Apache-2.0
 * @author ayakashigh11 (adapted from user provided logic)
 */

import puppeteer from "puppeteer";

/** @type {import('puppeteer').Browser | null} */
let cachedBrowser = null;
let browserPromise = null;

/**
 * Initialize or return a cached browser instance with race-condition protection
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
                    "--disable-web-security",
                    "--disable-features=IsolateOrigins,site-per-process",
                    "--disable-blink-features=AutomationControlled",
                    "--window-size=1920,1080",
                    "--lang=en-US,en"
                ],
                executablePath: process.env.CHROME_PATH || undefined
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

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
];

let handler = async (m, { text, sock, usedPrefix, command }) => {
    if (!text) return m.reply(`Usage: *${usedPrefix + command} {url} [mode] [fullscreen]*\n\n• *mode:* desktop/mobile (default: desktop)\n• *fullscreen:* true/false (default: true)`);

    const args = text.split(" ");
    let url = args[0];
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    const mode = (args[1] || 'desktop').toLowerCase();
    const fullscreen = args[2] !== undefined ? args[2].toLowerCase() === 'true' : true;

    // Validate URL
    try {
        new URL(url);
    } catch (e) {
        return m.reply("❌ Invalid URL format! Example: https://google.com");
    }

    if (!['desktop', 'mobile'].includes(mode)) {
        return m.reply("❌ Invalid mode! Use *desktop* or *mobile*.");
    }

    let page = null;
    try {
        await global.loading?.(m, sock);

        const browser = await getBrowser();
        page = await browser.newPage();

        // Advanced Anti-Detection Scripts (Always On)
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [
                    { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
                    { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
                    { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
                ]
            });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en', 'id'] });
            Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
            window.chrome = { runtime: {}, loadTimes: () => { }, csi: () => { }, app: {} };
        });

        // Stealth Headers
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none'
        });

        // Speed: Intercept and block ads/fonts
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const type = request.resourceType();
            const u = request.url();
            if (['font', 'media'].includes(type) || /ads|analytics|tracker/i.test(u)) {
                request.abort().catch(() => { });
            } else {
                request.continue().catch(() => { });
            }
        });

        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(randomUA);

        if (mode === 'mobile') {
            await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
        } else {
            await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        }

        await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() =>
            page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => { })
        );

        // stabilization wait
        await new Promise(r => setTimeout(r, 2000));

        const screenshotOptions = {
            type: 'png',
            fullPage: fullscreen
        };

        const screenshotBuffer = await page.screenshot(screenshotOptions);

        await page.close();
        page = null;

        const caption = `📸 *WEB SCREENSHOT*\n\n` +
            `• *URL:* ${url}\n` +
            `• *Mode:* ${mode.toUpperCase()}\n` +
            `• *Full:* ${fullscreen ? 'Yes' : 'No'}\n` +
            `• *Stealth:* Active\n` +
            `──────────────────────────\n\n` +
            `> Powered by Liora Turbo`;

        await sock.sendMessage(m.chat, {
            image: Buffer.from(screenshotBuffer),
            caption: caption
        }, { quoted: m });

    } catch (e) {
        console.error("SS Error:", e);
        m.reply(`❌ *SS Error:* ${e.message}`);
    } finally {
        if (page) await page.close().catch(() => { });
        await global.loading?.(m, sock, true);
    }
};

handler.help = ["ss", "screenshot", "ssweb"];
handler.tags = ["tools"];
handler.command = /^(ss|screenshot|ssweb)$/i;

handler.settings = {
    loading: true
};

export default handler;
