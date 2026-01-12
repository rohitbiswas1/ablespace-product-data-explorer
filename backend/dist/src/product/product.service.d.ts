import { PrismaService } from '../common/prisma.service';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProducts(categoryId?: string): Promise<({
        category: {
            title: string;
            id: number;
            lastScrapedAt: Date | null;
            slug: string;
            navigationId: number;
            parentId: number | null;
        };
    } & {
        title: string;
        imageUrl: string;
        price: number;
        id: number;
        sourceId: string;
        sourceUrl: string;
        currency: string;
        lastScrapedAt: Date | null;
        categoryId: number | null;
    })[]>;
}
