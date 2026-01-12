import { PlaywrightCrawlingContext } from 'crawlee';
import { PrismaService } from '../common/prisma.service';
export declare class ProductDetailScraper {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    scrape(context: PlaywrightCrawlingContext): Promise<void>;
}
