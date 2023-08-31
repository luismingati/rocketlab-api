import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SaleService } from './services/sale.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, SaleService],
})
export class ProductsModule {}
