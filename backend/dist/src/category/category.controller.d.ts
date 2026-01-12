import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(navigationId: number): Promise<{
        title: string;
        id: number;
        lastScrapedAt: Date | null;
        slug: string;
        navigationId: number;
        parentId: number | null;
    }[]>;
}
