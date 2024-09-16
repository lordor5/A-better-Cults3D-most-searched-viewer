import puppeteer from "puppeteer";
import { data, monthYearArray } from "../content/data/data.json";
const keywordlist = data;
const months = monthYearArray;

export async function scrapData() {
  if (import.meta.env.MODE === "dev?elopment") {
    console.log("You're in development mode");
    const salida = { data: keywordlist, monthYearArray: months };
    return salida;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 300000, // Timeout in milliseconds (30 seconds)
  });
  const page = await browser.newPage();

  //await page.goto("https://cults3d.com/en/pages/trending-searches");
  await page.goto("https://cults3d.com/es/pages/busquedas-de-tendencia");
  await page.setViewport({ width: 1080, height: 1024 });

  const data = await page.evaluate(() => {
    // Seleccionar todos los <ol> en la página.
    const orderedLists = document.querySelectorAll("ol");

    // Convertir NodeList en un array y mapear para obtener los textos de cada <li>.
    const listsArray = Array.from(orderedLists).map((ol) => {
      // Seleccionar todos los <li> dentro del <ol> y obtener sus textos.
      return Array.from(ol.querySelectorAll("li")).map(
        (li) => li.textContent?.trim() || ""
      );
    });

    return listsArray;
  });

  // Scrape the titles
  const titles = await page.evaluate(() => {
    // Get all the title elements
    const titleElements = document.querySelectorAll("h1");
    const titlesArray: Array<string> = [];
    titleElements.forEach((title) => {
      titlesArray.push(title.innerText);
    });
    return titlesArray;
  });

  // Extract month and year from the titles
  const monthYearArray = titles
    .map((title) => {
      // Match month and year
      const match = title.match(/- (\w+) (\d{4}) -/); //es
      //const match = title.match(/• (\w+) (\d{4}) •/); //us
      if (match) {
        return match[1] + match[2];
      }
      return null;
    })
    .filter((item) => item !== null); // Filter out any null values

  await browser.close();

  const salida = { data: data, monthYearArray: monthYearArray };

  return salida;
}

export async function getNumberOfModels(
  keywords: Array<string>
): Promise<Array<number>> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 300000, // Timeout in milliseconds (30 seconds)
  });
  const page = await browser.newPage();
  let items: Array<number> = [];
  for (let i = 0; i < keywords.length; i++) {
    // Go to the specified URL
    const url = `https://cults3d.com/es/b%C3%BAsqueda?q=${keywords[i]}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    // Extract the meta title content
    const metaTitle = await page.title();

    // Extract the number of items from the meta title
    const regex = /(\d+[.,]?\d*)\s?k?/;
    const match = metaTitle.match(regex);

    if (match && match[1]) {
      // Replace ',' or '.' with a decimal point and convert the number
      let numberOfItems = match[1].replace(",", ".");

      // If the number is in thousands, multiply by 1000
      if (metaTitle.includes("k")) {
        items[i] = parseFloat(numberOfItems) * 1000;
      } else {
        items[i] = parseFloat(numberOfItems);
      }
    }
  }
  await browser.close();

  return items;
}
