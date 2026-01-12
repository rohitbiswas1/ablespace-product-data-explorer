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
var JobsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const scrape_service_1 = require("../scrape/scrape.service");
let JobsController = JobsController_1 = class JobsController {
    constructor(scrapeService) {
        this.scrapeService = scrapeService;
        this.logger = new common_1.Logger(JobsController_1.name);
    }
    async runJob() {
        this.logger.log('🚀 Scrape job started');
        try {
            await this.scrapeService.scrapeAll();
            this.logger.log('✅ Scrape job finished successfully');
            return {
                status: 'Scraping completed successfully',
            };
        }
        catch (error) {
            this.logger.error('❌ Scrape job failed', error.stack);
            return {
                status: 'Scraping failed',
                error: error.message,
            };
        }
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "runJob", null);
exports.JobsController = JobsController = JobsController_1 = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [scrape_service_1.ScrapeService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map