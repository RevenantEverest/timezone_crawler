import "reflect-metadata";

import cron from 'node-cron';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';

import AppDataSource from './db/dataSource.js';
import waitForPostgres from './db/waitForPostgres.js';

import * as timezonesController from './controllers/timezones/index.js';

import { colors, logs } from './utils/index.js';

(async function main() {
    await waitForPostgres(AppDataSource);

    const url = "https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations";
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox"
        ]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const html = await page.content();

    const timezoneData = timezonesController.parse(html);

    await page.close();
    await browser.close();

    timezonesController.createJsonFile(timezoneData);
})();