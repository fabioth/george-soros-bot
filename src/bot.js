import { Bot, InputFile } from 'grammy';
import { TELEGRAM_BOT_TOKEN, GRAPH_URL } from './config.js';
import { captureChart } from './screenshot.js';

const bot = new Bot(TELEGRAM_BOT_TOKEN);

// Common aliases mapping
const aliases = [
    { unit: "eth", symbol: "ethusdt" },
    { unit: "btc", symbol: "btcusdt" },
    { unit: "ltc", symbol: "ltcusdt" },
    { unit: "xrp", symbol: "xrpusdt" },
    { unit: "ada", symbol: "adausdt" },
    { unit: "bch", symbol: "bchusdt" }
];

// Common intervals mapping
const intervals = {
    "1H": "60M",
    "D": "1D",
    "W": "1WK",
    "M": "1MO"
};

bot.command(['chart', 'c'], async (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    let symbol = args[0] ? args[0].toUpperCase() : 'AAPL';
    let interval = args[1] ? args[1].toUpperCase() : 'D';
    let debug = args[2];

    // Check for alias
    const findSymbol = aliases.find(p => p.unit.toUpperCase() === symbol);
    const correctSymbol = findSymbol ? findSymbol.symbol : symbol;

    // Check for interval
    if (intervals[interval]) {
        interval = intervals[interval];
    }

    try {
        // Generate screenshot
        const result = await captureChart(correctSymbol, interval);

        // Check for errors
        if (result.error) {
            return ctx.reply(`Error: ${result.error}`);
        }

        // // Generate caption
        // let caption = result.metaData || 'Chart';
        // if (debug === 'debug') {
        //     caption += `\n URL: ${GRAPH_URL}?symbol=${correctSymbol}&interval=${interval}`;
        // }

        // Send screenshot with metadata
        await ctx.replyWithPhoto(new InputFile(result.screenshotPath));

    } catch (error) {
        console.error('Error generating screenshot:', error);
        if (error.message.includes("Invalid symbol")) {
            ctx.reply(`${error.message}`);
        }
    }
});



bot.start();
console.log('🚀 Telegram bot started!');
