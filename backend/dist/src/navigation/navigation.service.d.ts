import { PrismaService } from '../common/prisma.service';
export declare class NavigationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        title: string;
        id: number;
        lastScrapedAt: Date | null;
        slug: string;
    }[]>;
}
