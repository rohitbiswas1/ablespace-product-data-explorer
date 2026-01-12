"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScrapeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeService = void 0;
const common_1 = require("@nestjs/common");
const crawlee_1 = require("crawlee");
const navigation_scraper_1 = require("./navigation.scraper");
const category_scraper_1 = require("./category.scraper");
const product_detail_scraper_1 = require("./product-detail.scraper");
let ScrapeService = ScrapeService_1 = class ScrapeService {
    constructor(navigationScraper, categoryScraper, productDetailScraper) {
        this.navigationScraper = navigationScraper;
        this.categoryScraper = categoryScraper;
        this.productDetailScraper = productDetailScraper;
        this.logger = new common_1.Logger(ScrapeService_1.name);
        this.crawler = new crawlee_1.PlaywrightCrawler({
            launchContext: {
                launchOptions: { headless: true },
            },
            maxRequestsPerCrawl: 200,
            requestHandler: async (context) => {
                var _a;
                const { request, log } = context;
                const label = (_a = request.userData) === null || _a === void 0 ? void 0 : _a.label;
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
};
exports.ScrapeService = ScrapeService;
exports.ScrapeService = ScrapeService = ScrapeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [navigation_scraper_1.NavigationScraper,
        category_scraper_1.CategoryScraper,
        product_detail_scraper_1.ProductDetailScraper])
], ScrapeService);
//# sourceMappingURL=scrape.service.js.map