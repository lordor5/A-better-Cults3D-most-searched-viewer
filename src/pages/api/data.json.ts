// src/pages/data.json.ts
import type { APIContext } from "astro";
import { scrapData } from "../../components/scraper";

export async function GET({ request }: APIContext) {
  // Define the JSON data
  const jsonData = await scrapData();

  // Return the JSON data as a downloadable file
  return new Response(JSON.stringify(jsonData), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="data.json"',
    },
  });
}
