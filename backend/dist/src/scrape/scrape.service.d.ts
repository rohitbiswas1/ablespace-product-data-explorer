import { NavigationScraper } from './navigation.scraper';
import { CategoryScraper } from './category.scraper';
import { ProductDetailScraper } from './product-detail.scraper';
export declare class ScrapeService {
    private readonly navigationScraper;
    private readonly categoryScraper;
    private readonly productDetailScraper;
    private readonly logger;
    private crawler;
    constructor(navigationScraper: NavigationScraper, categoryScraper: CategoryScraper, productDetailScraper: ProductDetailScraper);
    scrapeAll(): Promise<void>;
}
