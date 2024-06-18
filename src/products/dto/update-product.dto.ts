import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  product_name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  img?: string;

  @IsString()
  @IsOptional()
  descript?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  category?: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
