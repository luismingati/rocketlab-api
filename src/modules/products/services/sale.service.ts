import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SellProductDto } from '../dto/sell-product.dto';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async sell(sellProductDto: SellProductDto) {
    const { products } = sellProductDto;

    for (const product of products) {
      const dbProduct = await this.prisma.product.findUnique({
        where: { id: product.id },
      });

      if (dbProduct.quantity < product.quantity) {
        throw new Error('Quantidade insuficiente');
      }
    }

    const sales = this.prisma.$transaction(
      products.map((product) =>
        this.prisma.product.update({
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
