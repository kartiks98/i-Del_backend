import { IsNotEmpty, IsString } from "class-validator";

export class AddToCart {
  @IsNotEmpty()
  @IsString()
  productId: string;
}

export class UpdateCartItem {}
