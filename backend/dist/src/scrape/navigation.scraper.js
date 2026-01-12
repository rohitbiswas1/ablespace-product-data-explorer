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
var NavigationScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationScraper = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let NavigationScraper = NavigationScraper_1 = class NavigationScraper {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NavigationScraper_1.name);
    }
    async scrape(context) {
        const { page, enqueueLinks } = context;
        this.logger.log('🔍 Scraping navigation categories');
        await page.waitForLoadState('domcontentloaded');
        const navigation = await this.prisma.navigation.upsert({
            where: { slug: 'world-of-books' },
            update: {},
            create: {
                title: 'World of Books',
                slug: 'world-of-books',
            },
        });
        const categories = await page.$$eval('header nav a', (links) => links
            .map((a) => {
            var _a;
            return ({
                title: ((_a = a.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                url: a.href,
            });
        })
            .filter((c) => c.title.length > 2 &&
            c.url.includes('/en-gb/')));
        this.logger.log(`Found ${categories.length} categories`);
        for (const category of categories) {
            const slug = category.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            await this.prisma.category.upsert({
                where: {
                    slug_navigationId: {
                        slug,
                        navigationId: navigation.id,
                    },
                },
                update: {},
                create: {
                    title: category.title,
                    slug,
                    navigationId: navigation.id,
                },
            });
            await enqueueLinks({
                urls: [category.url],
                label: 'CATEGORY',
            });
        }
        this.logger.log('💾 Categories saved & category pages queued');
    }
};
exports.NavigationScraper = NavigationScraper;
exports.NavigationScraper = NavigationScraper = NavigationScraper_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NavigationScraper);
//# sourceMappingURL=navigation.scraper.js.map