import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('products')
export class ProductController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getProducts() {
    return this.prisma.product.findMany({
      orderBy: { id: 'desc' },
      take: 50,
      select: {
        id: true,
        title: true,
        price: true,
        imageUrl: true,
        sourceUrl: true,
      },
    });
  }
}
