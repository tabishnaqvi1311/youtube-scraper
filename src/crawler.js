const puppeteer = require('puppeteer')


const scrape = async (id) => {
    const browser = await puppeteer.launch({ headless: 'true' });
    const page = await browser.newPage();

    console.log('opened browser')

    const pageURL = `https://www.youtube.com/watch?v=${id}`

    console.log(pageURL)

    try {
        await page.goto(pageURL);
    } 
    catch (error) {
            console.log('OOPS! your network connection seems to be slow, RECURSIVE RESTART!');
            await browser.close()
            return scrape(id);
        }

    console.log(`at video...`);

    let viewsText = null

    await page.waitForSelector('tp-yt-paper-button#expand-sizer');
    
    try {
        await page.click('tp-yt-paper-button#expand-sizer')
        viewsText = await page.evaluate(() => {
            const views = document.querySelector("yt-formatted-string#info.style-scope.ytd-watch-metadata > span").innerHTML

            return views.split(" ")[0];
        });
    }
    catch (error) {
        console.log({ error: error.message });
        browser.close();
        return
    }

    console.log(viewsText)
    console.log('done')

    await browser.close();
    
}

module.exports = scrape