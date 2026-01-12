import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { NavigationScraper } from './navigation.scraper';
import { CategoryScraper } from './category.scraper';
import { ProductDetailScraper } from './product-detail.scraper';
import { PrismaService } from '../common/prisma.service';

@Module({
  providers: [
    ScrapeService,
    NavigationScraper,
    CategoryScraper,
    ProductDetailScraper,
    PrismaService,
  ],
  exports: [ScrapeService],
})
export class ScrapeModule {}
