// category.scraper.ts
import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawlingContext } from 'crawlee';

@Injectable()
export class CategoryScraper {
  private readonly logger = new Logger(CategoryScraper.name);

  async scrape({ page, enqueueLinks }: PlaywrightCrawlingContext) {
    this.logger.log('📂 Scraping category page');

    await page.waitForLoadState('domcontentloaded');

    const productLinks = await page.$$eval(
      'a[href*="/products/"]',
      (links) =>
        links
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((href) => href.includes('/products/')),
    );

    this.logger.log(`✅ Found ${productLinks.length} products`);

    await enqueueLinks({
      urls: productLinks,
      userData: { label: 'PRODUCT_DETAIL' },
    });
  }
}
