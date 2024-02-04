const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch(
        {headless: 'new', args: ['--no-sandbox', '--disable-setup-sandbox', '--disable-web-security']}
    );

    const page = await browser.newPage();

    // Set the website url
    const website_url = 'http://localhost:4200/';

    await page.goto(website_url);
    await page.emulateMediaType('screen');

    await page.evaluate(() => {
        const _page = document.querySelector('.page');
        _page.style.marginTop = '0';
        _page.style.marginBottom = '0';
    });

    const pdf = await page.pdf({
        path: 'result.pdf',
        format: 'A4',
        displayHeaderFooter: true,
    });

    await browser.close();
})();
