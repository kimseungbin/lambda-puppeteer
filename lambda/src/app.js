import { createBrowserInstance } from './browser.js'

/**
 * @type {import('puppeteer-core').Browser}
 */
let browser

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
export const lambdaHandler = async (event, context) => {

    try {
         browser ??= await createBrowserInstance()

        const [page] = await browser.pages()
        await page.goto('https://www.google.com', { waitUntil: 'networkidle2' })

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: await page.title()
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }
}
