import { PrismaService } from '../common/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(navigationId?: number): Promise<{
        title: string;
        id: number;
        lastScrapedAt: Date | null;
        slug: string;
        navigationId: number;
        parentId: number | null;
    }[]>;
}
