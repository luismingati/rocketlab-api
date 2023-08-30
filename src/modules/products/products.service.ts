import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    const { name, description, price, imageUrl, quantity } = createProductDto;

    return this.prisma.product.create({
      data: { name, description, price, imageUrl, quantity },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { name, description, price, imageUrl, quantity } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: { name, description, price, imageUrl, quantity },
    });
  }

  remove(id: string) {
    this.prisma.product.delete({ where: { id } });
  }
}
