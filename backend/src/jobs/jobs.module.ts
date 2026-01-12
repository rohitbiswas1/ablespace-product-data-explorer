import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { ScrapeModule } from '../scrape/scrape.module';

@Module({
  imports: [ScrapeModule], // ✅ REQUIRED
  controllers: [JobsController],
})
export class JobsModule {}
