//import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false, //false: abre uma instancia do navegador, true: o processo é executado pelo terminal
    defaultViewport: false, //ajusta o tamanho da tela
    userDataDir: './tmp'
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.amazon.com.br/s?i=specialty-aps&rh=n%3A17100554011%2Cp_36%3A17270755011&content-id=amzn1.sym.3178226f-5c11-45c6-9465-6b7494dc0718&pd_rd_r=5f526c00-e876-4b11-9449-4241efba1884&pd_rd_w=0l7As&pd_rd_wg=2562Y&pf_rd_p=3178226f-5c11-45c6-9465-6b7494dc0718&pf_rd_r=VJ9FF7J9YHJB6B1MHB6H&ref=Oct_d_oup_S');

  const productHandles = await page.$$('.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item');

  for(const productHandle of productHandles){
    try {
      const title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, productHandle)

      console.log(title)
    } catch (error) {
      
    }
    try {
      const price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, productHandle)

      console.log(price)
    } catch (error) {
      
    }
    try {
      const image = await page.evaluate(el => el.querySelector(".s-image").src, productHandle)

      console.log(image)
    } catch (error) {
      
    }
  }

/*   // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  await page.screenshot({path: 'example.png'});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close(); */
})();