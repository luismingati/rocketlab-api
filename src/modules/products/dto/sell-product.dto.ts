import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class ProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class SellProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
