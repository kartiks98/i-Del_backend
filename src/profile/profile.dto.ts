import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateProfile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isSubscribed: boolean;

  //   @IsArray()
  //   @IsString({ each: true }) // "each" tells class-validator to run the validation on each item of the array
  //   wishlistItems: string[];
}
