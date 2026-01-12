import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(categoryId?: string) {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : {},
      take: 20,
      include: {
        category: true,
      },
    });
  }
}
