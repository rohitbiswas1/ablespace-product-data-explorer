import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class NavigationService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.navigation.findMany();
    }
}
