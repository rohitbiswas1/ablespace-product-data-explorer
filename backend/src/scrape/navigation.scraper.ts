import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawlingContext } from 'crawlee';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class NavigationScraper {
  private readonly logger = new Logger(NavigationScraper.name);

  constructor(private readonly prisma: PrismaService) {}

  async scrape(context: PlaywrightCrawlingContext) {
    const { page, enqueueLinks } = context;

    this.logger.log('🔍 Scraping navigation categories');

    await page.waitForLoadState('domcontentloaded');

    // Ensure Navigation exists
    const navigation = await this.prisma.navigation.upsert({
      where: { slug: 'world-of-books' },
      update: {},
      create: {
        title: 'World of Books',
        slug: 'world-of-books',
      },
    });

    // ✅ More precise selector for top navigation
    const categories = await page.$$eval(
      'header nav a',
      (links) =>
        links
          .map((a) => ({
            title: a.textContent?.trim() || '',
            url: (a as HTMLAnchorElement).href,
          }))
          .filter(
            (c) =>
              c.title.length > 2 &&
              c.url.includes('/en-gb/')
          )
    );

    this.logger.log(`Found ${categories.length} categories`);

    for (const category of categories) {
      const slug = category.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // 💾 Save category
      await this.prisma.category.upsert({
        where: {
          slug_navigationId: {
            slug,
            navigationId: navigation.id,
          },
        },
        update: {},
        create: {
          title: category.title,
          slug,
          navigationId: navigation.id,
        },
      });

      // 🚀 CRITICAL: enqueue category page
      await enqueueLinks({
        urls: [category.url],
        label: 'CATEGORY',
      });
    }

    this.logger.log('💾 Categories saved & category pages queued');
  }
}
