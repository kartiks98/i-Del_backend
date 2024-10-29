import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class UpdateCartItem {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsBoolean()
  isSelected: boolean;
}

export class UpdateQuantityByN {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantityToUpdate: number;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdd: boolean;
}
