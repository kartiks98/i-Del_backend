import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class AddToCart {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: string;

  @IsNotEmpty()
  @IsBoolean()
  isSelected: boolean;
}

export class UpdateCartItem {}
