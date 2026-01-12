import { Controller, Post, Logger } from '@nestjs/common';
import { ScrapeService } from '../scrape/scrape.service';

@Controller('jobs')
export class JobsController {
  private readonly logger = new Logger(JobsController.name);

  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('run')
  async runJob() {
    this.logger.log('🚀 Scrape job started');

    try {
      await this.scrapeService.scrapeAll();
      this.logger.log('✅ Scrape job finished successfully');

      return {
        status: 'Scraping completed successfully',
      };
    } catch (error) {
      this.logger.error('❌ Scrape job failed', error.stack);

      return {
        status: 'Scraping failed',
        error: error.message,
      };
    }
  }
}
