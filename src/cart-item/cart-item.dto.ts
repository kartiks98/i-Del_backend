import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateCartItem {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsString() // "each" tells class-validator to run the validation on each item of the array
  productId: string;
}
