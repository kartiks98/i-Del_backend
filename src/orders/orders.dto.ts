import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { IOrderStatus } from "./orders.interface";

const orderStatusErrorMessage = `Status could only be one of the following : ${Object.values(IOrderStatus).join(", ")}`;

export class CreateOrder {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  quantities: number[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // "each" tells class-validator to run the validation on each item of the array
  productIds: string[];
}

export class UpdateOrder {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  quantities: number[];

  @IsOptional()
  @IsEnum(IOrderStatus, {
    message: orderStatusErrorMessage,
  })
  status: IOrderStatus;
}

export class FilterQueryParams {
  @IsOptional()
  @IsEnum(IOrderStatus, {
    message: orderStatusErrorMessage,
  })
  status: IOrderStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
