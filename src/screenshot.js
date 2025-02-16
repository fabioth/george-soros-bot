import { chromium } from 'playwright';
import { GRAPH_URL } from './config.js';

export async function captureChart(symbol = 'AAPL', interval = '1D') {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({
          width: 960,
          height: 750,
    });
    let screenshotPath = `screenshot.png`;

    const url = `${GRAPH_URL}?symbol=${symbol}&interval=${interval}`;
    console.log(`🌍 Loading chart: ${url}`);

    try {
        await page.goto(url, { waitUntil: 'networkidle' });

        await page.waitForSelector('canvas', { visible: true });

        await page.waitForFunction(() => {
            const canvas = document.querySelector('canvas');
            return canvas && canvas.width > 0 && canvas.height > 0;
        }, { timeout: 10000 }); // Max 10 seconden wachten

        // Check if the page contains an error message
        const errorElement = await page.$('.error-message');
        if (errorElement) {
            const errorText = await errorElement.textContent();
            throw new Error(errorText.trim() || "Invalid symbol or data not available.");
        }

        // Take a screenshot
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();
        return { screenshotPath };

    } catch (error) {
        console.error('❌ Error loading chart:', error.message);
        await browser.close();
        return { error: error.message }; // Return a structured error
    }
}
