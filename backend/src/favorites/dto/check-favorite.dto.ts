import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  productId: number;
}

