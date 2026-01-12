import { PlaywrightCrawlingContext } from 'crawlee';
export declare class CategoryScraper {
    private readonly logger;
    scrape({ page, enqueueLinks }: PlaywrightCrawlingContext): Promise<void>;
}
