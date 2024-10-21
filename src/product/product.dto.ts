import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  availableQuantity: number;
}

export class UpdateProduct {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  availableQuantity: number;
}

export class SearchFilter {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
