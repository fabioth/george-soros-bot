# George Soros the Tradingview bot

The George Soros Tradingview bot is named after the Hungarian-American billionaire investor and philanthropist. This bot captures screenshots from the free tradingview widget and will send them via your telegram bot to the proper channel.

## Getting Started

### Prerequisites

This bot is based on NodeJS and uses Playwright from Microsoft. 

Create an Telegram bot token. [More information here](https://core.telegram.org/bots)

Install NodeJS. [Download here](https://nodejs.org/en/)


### Installing
To install this project serveral steps are needed. 

```
npm install
```

Next create an .env file with the following content

```
TELEGRAM_BOT_TOKEN=<api token here>
GRAPH_URL=<url where it takes screenshots from>
```

## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime
* [grammY](https://grammy.dev/) - The Telegram Bot Framework
* [Playwright](https://playwright.dev/) - Normally used for E2E testing but of course can be used to screenshot pages

## Authors

* **Michele Marotto**

## Acknowledgments

* Hat tip to anyone whose code was used
