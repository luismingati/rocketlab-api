import { Injectable } from '@nestjs/common';

import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from 'src/shared/database/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  create(createProductDto: CreateProductDto) {
    const { name, description, price, imageUrl, quantity } = createProductDto;

    return this.productsRepo.create({
      data: { name, description, price, imageUrl, quantity },
    });
  }

  findAll() {
    return this.productsRepo.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        quantity: true,
      },
    });
  }

  findOne(id: string) {
    return this.productsRepo.findFirst({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { name, description, price, imageUrl, quantity } = updateProductDto;

    return this.productsRepo.update({
      where: { id },
      data: { name, description, price, imageUrl, quantity },
    });
  }

  remove(id: string) {
    this.productsRepo.delete({ where: { id } });
  }
}
