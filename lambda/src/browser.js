import chromium from '@sparticuz/chromium'
import { launch } from 'puppeteer-core'

export async function createBrowserInstance() {
    console.log('Creating a browser instance')
    try {
        const browser = await launch({
            headless: 'new',
            args: [
                ...chromium.args,
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--deterministic-fetch',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials'
            ],
            defaultViewport: chromium.defaultViewport,
            ignoreHTTPSErrors: true,
            executablePath: await chromium.executablePath()
        })

        return browser
    } catch (e) {
        console.error('Error while creating a browser instance', e)
        throw e
    }
}