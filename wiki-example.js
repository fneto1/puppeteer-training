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
  await page.goto('https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Brasil');

  const productHandles = await page.$$('.wikitable tbody tr');

  for(const productHandle of productHandles){
    try {
      const title = await page.evaluate(el => el.querySelector("td:nth-child(2) > b > a").textContent, productHandle)
      console.log(title)
    } catch (error) {
      
    }

    try {
      const img = await page.evaluate(el => el.querySelector("td:nth-child(3) > span > a").href, productHandle)
      console.log(img)
    } catch (error) {
      
    }

    
  }
})();