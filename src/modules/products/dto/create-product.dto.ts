import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsString()
  @MaxLength(800)
  description?: string;
}
