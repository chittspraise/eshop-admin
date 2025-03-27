import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Use the stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

// Custom delay function
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Set to false to manually pass the CAPTCHA if needed
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    );

    console.log('Navigating to:', 'https://www.makro.co.za');
    await page.goto('https://www.makro.co.za', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait and manually solve CAPTCHA if it appears
    console.log('Waiting for possible CAPTCHA...');
    await delay(15000); // Wait 15 seconds using the delay function

    console.log('Navigating to product page...');
    await page.goto(
      'https://www.makro.co.za/food/snacks-biscuits-sweets/nuts-dried-fruit/nuts-dried-fruit/other-nuts/montagu-cashews-roasted-salted-50-g-/p/000000000404981001_EA',
      { waitUntil: 'networkidle2', timeout: 60000 }
    );

    // Wait for the product title to load
    await page.waitForSelector('[data-qa="product-title"]', { timeout: 10000 });

    const product = await page.evaluate(() => {
      const title =
        document.querySelector('[data-qa="product-title"]')?.textContent?.trim() || 'No title found';
      const price =
        document.querySelector('[data-qa="product-price"]')?.textContent?.trim() || 'No price found';
      const description =
        document.querySelector('[data-qa="long-description"]')?.textContent?.trim() || 'No description found';
      const imageUrl =
        document.querySelector('img[data-qa="product-image"]')?.getAttribute('src') || 'No image found';

      return { title, price, description, imageUrl };
    });

    console.log('Scraped Product Details:', product);

    await browser.close();
  } catch (error) {
    console.error('Error during scraping:', error);
  }
})();
