import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawlingContext } from 'crawlee';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CategoryScraper {
  private readonly logger = new Logger(CategoryScraper.name);

  constructor(private readonly prisma: PrismaService) {}

  async scrape(context: PlaywrightCrawlingContext) {
    const { page } = context;

    this.logger.log('📂 Scraping category page');

    await page.waitForLoadState('domcontentloaded');

    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('li.product-item')).map(el => {
        const title =
          el.querySelector('h3 a')?.textContent?.trim() || '';

        const priceText =
          el.querySelector('.price')?.textContent || '';

        const imageUrl =
          el.querySelector('img')?.getAttribute('src') ||
          el.querySelector('img')?.getAttribute('data-src') ||
          '';

        const sourceUrl =
          el.querySelector('h3 a')?.getAttribute('href') || '';

        return {
          title,
          price: parseFloat(priceText.replace(/[^\d.]/g, '')) || 0,
          imageUrl: imageUrl.startsWith('http')
            ? imageUrl
            : imageUrl
            ? `https:${imageUrl}`
            : '',
          sourceUrl: sourceUrl.startsWith('http')
            ? sourceUrl
            : `https://www.worldofbooks.com${sourceUrl}`,
        };
      });
    });

    this.logger.log(`✅ Found ${products.length} products`);

    for (const product of products) {
      if (!product.title || !product.sourceUrl) continue;

      await this.prisma.product.upsert({
        where: { sourceUrl: product.sourceUrl },
        update: {
          price: product.price,
          imageUrl: product.imageUrl,
          lastScrapedAt: new Date(),
        },
        create: {
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          sourceUrl: product.sourceUrl,
          sourceId: 'worldofbooks',
          currency: 'GBP',
          lastScrapedAt: new Date(),
        },
      });
    }
  }
}
