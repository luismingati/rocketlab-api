import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './products.repository';

@Global()
@Module({
  providers: [PrismaService, ProductsRepository],
  exports: [ProductsRepository],
})
export class DatabaseModule {}
