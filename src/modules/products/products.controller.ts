import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // create(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   console.log(file);
  //   const { price, quantity } = createProductDto;

  //   const transformedProductDto = {
  //     ...createProductDto,
  //     price: parseFloat(price),
  //     quantity: parseInt(quanti),
  //   };

  //   return this.productsService.create(transformedProductDto);
  // }

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
