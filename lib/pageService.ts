import type { PageData } from "./crawler.ts";

const pages: PageData[] = [];

export function savePage(page: PageData) {
  pages.push(page);
  console.log("Saved:", page.url);
}

export function getPages() {
  return pages;
}

