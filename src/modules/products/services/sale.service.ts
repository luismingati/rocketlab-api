import { Injectable } from '@nestjs/common';
import { SellProductDto } from '../dto/sell-product.dto';
import { ProductsRepository } from 'src/shared/database/products.repository';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class SaleService {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private prisma: PrismaService,
  ) {}

  async sell(sellProductDto: SellProductDto) {
    const { products } = sellProductDto;

    for (const product of products) {
      const dbProduct = await this.productsRepo.findFirst({
        where: { id: product.id },
      });

      if (dbProduct.quantity < product.quantity) {
        throw new Error('Quantidade insuficiente');
      }
    }

    const sales = this.prisma.$transaction(
      products.map((product) =>
        this.productsRepo.update({
          where: { id: product.id },
          data: {
            quantity: {
              decrement: product.quantity,
            },
          },
        }),
      ),
    );

    return sales;
  }
}
