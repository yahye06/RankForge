import axios from "axios";

import * as cheerio from "cheerio";

export interface PageData {
  url: string;
  title: string;
  headings: string[];
}

export async function crawlPage(
  url: string
): Promise<PageData | null> {
  try {
    const res = await axios.get(url);

    const $ = cheerio.load(res.data);

    const title = $("title").text() || "";

    const headings: string[] = [];
    $("h1, h2, h3").each((_, el) => {
      headings.push($(el).text());
    });

    return { url, title, headings };
  } catch (err) {
    console.error("Error crawling:", url, err);
    return null;
  }
}
