import { ScrapeService } from '../scrape/scrape.service';
export declare class JobsController {
    private readonly scrapeService;
    private readonly logger;
    constructor(scrapeService: ScrapeService);
    runJob(): Promise<{
        status: string;
        error?: undefined;
    } | {
        status: string;
        error: any;
    }>;
}
