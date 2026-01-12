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
var ProductDetailScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailScraper = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ProductDetailScraper = ProductDetailScraper_1 = class ProductDetailScraper {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProductDetailScraper_1.name);
    }
    async scrape(context) {
        const { page, request } = context;
        this.logger.log(`📦 Scraping product detail: ${request.url}`);
        await page.waitForLoadState('domcontentloaded');
        const data = await page.evaluate(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const title = ((_b = (_a = document.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            const priceText = ((_c = document.querySelector('[itemprop="price"]')) === null || _c === void 0 ? void 0 : _c.getAttribute('content')) ||
                ((_d = document.querySelector('.price')) === null || _d === void 0 ? void 0 : _d.textContent) ||
                '0';
            const imageUrl = ((_e = document.querySelector('img[itemprop="image"]')) === null || _e === void 0 ? void 0 : _e.src) ||
                ((_f = document.querySelector('.product-image img')) === null || _f === void 0 ? void 0 : _f.getAttribute('src')) ||
                '';
            const description = ((_h = (_g = document.querySelector('[itemprop="description"]')) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) ||
                ((_k = (_j = document.querySelector('.product-description')) === null || _j === void 0 ? void 0 : _j.textContent) === null || _k === void 0 ? void 0 : _k.trim()) ||
                '';
            const ratingText = ((_l = document.querySelector('[itemprop="ratingValue"]')) === null || _l === void 0 ? void 0 : _l.getAttribute('content')) ||
                null;
            const reviewCountText = ((_m = document.querySelector('[itemprop="reviewCount"]')) === null || _m === void 0 ? void 0 : _m.getAttribute('content')) ||
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
};
exports.ProductDetailScraper = ProductDetailScraper;
exports.ProductDetailScraper = ProductDetailScraper = ProductDetailScraper_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductDetailScraper);
//# sourceMappingURL=product-detail.scraper.js.map