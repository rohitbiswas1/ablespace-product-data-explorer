"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CategoryScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryScraper = void 0;
const common_1 = require("@nestjs/common");
let CategoryScraper = CategoryScraper_1 = class CategoryScraper {
    constructor() {
        this.logger = new common_1.Logger(CategoryScraper_1.name);
    }
    async scrape({ page, enqueueLinks }) {
        this.logger.log('📂 Scraping category page');
        await page.waitForLoadState('domcontentloaded');
        const productLinks = await page.$$eval('a[href*="/products/"]', (links) => links
            .map((a) => a.href)
            .filter((href) => href.includes('/products/')));
        this.logger.log(`✅ Found ${productLinks.length} products`);
        await enqueueLinks({
            urls: productLinks,
            userData: { label: 'PRODUCT_DETAIL' },
        });
    }
};
exports.CategoryScraper = CategoryScraper;
exports.CategoryScraper = CategoryScraper = CategoryScraper_1 = __decorate([
    (0, common_1.Injectable)()
], CategoryScraper);
//# sourceMappingURL=category.scraper.js.map