import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async findAll(navigationId?: number) {
        if (navigationId) {
            return this.prisma.category.findMany({ where: { navigationId } });
        }
        return this.prisma.category.findMany();
    }
}
