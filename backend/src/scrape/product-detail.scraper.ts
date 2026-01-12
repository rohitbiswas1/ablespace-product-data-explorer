import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawlingContext } from 'crawlee';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ProductDetailScraper {
  private readonly logger = new Logger(ProductDetailScraper.name);

  constructor(private readonly prisma: PrismaService) {}

  async scrape(context: PlaywrightCrawlingContext) {
    const { page, request } = context;

    this.logger.log(`📦 Scraping product detail: ${request.url}`);

    await page.waitForLoadState('domcontentloaded');

    // 🔹 Extract core product data FIRST
    const data = await page.evaluate(() => {
      const title =
        document.querySelector('h1')?.textContent?.trim() || '';

      const priceText =
        document.querySelector('[itemprop="price"]')?.getAttribute('content') ||
        document.querySelector('.price')?.textContent ||
        '0';

      const imageUrl =
        (document.querySelector('img[itemprop="image"]') as HTMLImageElement)
          ?.src ||
        document.querySelector('.product-image img')?.getAttribute('src') ||
        '';

      const description =
        document.querySelector('[itemprop="description"]')?.textContent?.trim() ||
        document.querySelector('.product-description')?.textContent?.trim() ||
        '';

      const ratingText =
        document.querySelector('[itemprop="ratingValue"]')?.getAttribute('content') ||
        null;

      const reviewCountText =
        document.querySelector('[itemprop="reviewCount"]')?.getAttribute('content') ||
        null;

      return {
        title,
        price: parseFloat(priceText.replace(/[^\d.]/g, '')) || 0,
        imageUrl,
        description,
        ratingAvg: ratingText ? parseFloat(ratingText) : null,
        reviewCount: reviewCountText ? parseInt(reviewCountText) : null,
      };
    });

    if (!data.title) {
      this.logger.warn(`⚠️ No title found, skipping ${request.url}`);
      return;
    }

    // 🔹 UPSERT PRODUCT (THIS WAS MISSING)
    const product = await this.prisma.product.upsert({
      where: { sourceUrl: request.url },
      update: {
        price: data.price,
        imageUrl: data.imageUrl,
        lastScrapedAt: new Date(),
      },
      create: {
        sourceId: request.url.split('/').pop() || request.url,
        title: data.title,
        price: data.price,
        currency: 'GBP',
        imageUrl: data.imageUrl,
        sourceUrl: request.url,
        lastScrapedAt: new Date(),
      },
    });

    // 🔹 UPSERT PRODUCT DETAIL
    await this.prisma.productDetail.upsert({
      where: { productId: product.id },
      update: {
        description: data.description,
        ratingAvg: data.ratingAvg,
        reviewCount: data.reviewCount,
      },
      create: {
        productId: product.id,
        description: data.description,
        ratingAvg: data.ratingAvg,
        reviewCount: data.reviewCount,
      },
    });

    this.logger.log(`✅ Product saved: ${product.title}`);
  }
}
