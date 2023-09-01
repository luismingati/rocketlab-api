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
  Patch,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { SaleService } from './services/sale.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly saleService: SaleService,
  ) {}

  @Patch('sell')
  sell(@Body() sellProductDto: SellProductDto) {
    return this.saleService.sell(sellProductDto);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const { name, description, price, quantity } = createProductDto;
    const imageUrl = file.filename;

    const transformedDto = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl,
    };

    return this.productsService.create(transformedDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { name, description, price, quantity } = updateProductDto;
    const imageUrl = file.filename;

    const transformedDto = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl,
    };

    return this.productsService.update(id, transformedDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
