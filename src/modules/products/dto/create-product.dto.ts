import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @Min(0.01)
  @IsNumber()
  price: number;

  imageUrl: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsInt()
  @Min(0)
  quantity?: number;

  @IsString()
  @MaxLength(800)
  description?: string;
}
