import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categories: string[];

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
  @IsArray()
  // @ArrayMinSize(1)
  @IsString({ each: true })
  categories?: string[];

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
