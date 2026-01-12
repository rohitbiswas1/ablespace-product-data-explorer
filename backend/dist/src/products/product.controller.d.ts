import { PrismaService } from '../common/prisma.service';
export declare class ProductController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProducts(): Promise<{
        title: string;
        imageUrl: string;
        price: number;
        id: number;
        sourceId: string;
        sourceUrl: string;
        currency: string;
        lastScrapedAt: Date | null;
        categoryId: number | null;
    }[]>;
}
