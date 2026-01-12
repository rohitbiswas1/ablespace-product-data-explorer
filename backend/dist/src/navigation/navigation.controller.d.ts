import { NavigationService } from './navigation.service';
export declare class NavigationController {
    private readonly navigationService;
    constructor(navigationService: NavigationService);
    findAll(): Promise<{
        title: string;
        id: number;
        lastScrapedAt: Date | null;
        slug: string;
    }[]>;
}
