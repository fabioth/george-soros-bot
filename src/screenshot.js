import { firefox } from 'playwright';
import { GRAPH_URL } from './config.js';

export async function captureChart(symbol = 'AAPL', interval = '1D') {
    const browser = await firefox.launch({
        headless: true
    });
    const page = await browser.newPage({
        viewport: {
            width: 960,
            height: 750,
        },
        deviceScaleFactor: 2
    });
    let screenshotPath = `screenshot.png`;

    const url = `${GRAPH_URL}?symbol=${symbol}&interval=${interval}`;
    console.log(`🌍 Loading chart: ${url}`);

    try {
        await page.goto(url, { waitUntil: 'networkidle' });

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
        await context.close();
        await browser.close();
        return { error: error.message };
    }
}
