import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get(':navigationId')
    findAll(@Param('navigationId', ParseIntPipe) navigationId: number) {
        return this.categoryService.findAll(navigationId);
    }
}
