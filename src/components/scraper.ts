import puppeteer from "puppeteer";

export async function scrapData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

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
      const match = title.match(/- (\w+) (\d{4}) -/);
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
