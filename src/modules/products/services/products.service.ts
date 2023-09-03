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

  async findOne(id: string) {
    await this.productsRepo.validateId(id);

    const product = await this.productsRepo.findFirst({ where: { id: id } });
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productsRepo.validateId(id);

    const { name, description, price, imageUrl, quantity } = updateProductDto;

    return this.productsRepo.update({
      where: { id: id },
      data: { name, description, price, imageUrl, quantity },
    });
  }

  async remove(id: string) {
    await this.productsRepo.validateId(id);

    await this.productsRepo.delete({ where: { id: id } });
  }
}
