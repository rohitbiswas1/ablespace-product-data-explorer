import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ScrapeModule } from './scrape/scrape.module';
import { JobsModule } from './jobs/jobs.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ScrapeModule,
    JobsModule,
    ProductModule,
  ],
})
export class AppModule {}
