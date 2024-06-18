import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsNotEmpty()
  descript: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
