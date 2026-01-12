import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import { NavigationScraper } from './navigation.scraper';
import { CategoryScraper } from './category.scraper';
import { ProductDetailScraper } from './product-detail.scraper';

@Injectable()
export class ScrapeService {
  private readonly logger = new Logger(ScrapeService.name);
  private crawler: PlaywrightCrawler;

  constructor(
    private readonly navigationScraper: NavigationScraper,
    private readonly categoryScraper: CategoryScraper,
    private readonly productDetailScraper: ProductDetailScraper,
  ) {
    this.crawler = new PlaywrightCrawler({
      launchContext: {
        launchOptions: { headless: true },
      },
      maxRequestsPerCrawl: 200,

      requestHandler: async (context) => {
        const { request, log } = context;
        const label = request.userData?.label;

        log.info(`➡️ Processing ${request.url} [${label}]`);

        switch (label) {
          case 'NAVIGATION':
            await this.navigationScraper.scrape(context);
            break;

          case 'CATEGORY':
            await this.categoryScraper.scrape(context);
            break;

          case 'PRODUCT_DETAIL':
            await this.productDetailScraper.scrape(context);
            break;

          default:
            log.warning(`Unknown label: ${label}`);
        }
      },
    });
  }

  async scrapeAll() {
    this.logger.log('🚀 Starting full scrape');

    await this.crawler.run([
      {
        url: 'https://www.worldofbooks.com/',
        userData: { label: 'NAVIGATION' },
      },
    ]);

    this.logger.log('✅ Scrape finished');
  }
}
