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
var CategoryScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryScraper = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let CategoryScraper = CategoryScraper_1 = class CategoryScraper {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CategoryScraper_1.name);
    }
    async scrape(context) {
        const { page } = context;
        this.logger.log('📂 Scraping category page');
        await page.waitForLoadState('domcontentloaded');
        const products = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('li.product-item')).map(el => {
                var _a, _b, _c, _d, _e, _f;
                const title = ((_b = (_a = el.querySelector('h3 a')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                const priceText = ((_c = el.querySelector('.price')) === null || _c === void 0 ? void 0 : _c.textContent) || '';
                const imageUrl = ((_d = el.querySelector('img')) === null || _d === void 0 ? void 0 : _d.getAttribute('src')) ||
                    ((_e = el.querySelector('img')) === null || _e === void 0 ? void 0 : _e.getAttribute('data-src')) ||
                    '';
                const sourceUrl = ((_f = el.querySelector('h3 a')) === null || _f === void 0 ? void 0 : _f.getAttribute('href')) || '';
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
            if (!product.title || !product.sourceUrl)
                continue;
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
};
exports.CategoryScraper = CategoryScraper;
exports.CategoryScraper = CategoryScraper = CategoryScraper_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryScraper);
//# sourceMappingURL=product.scraper.js.map