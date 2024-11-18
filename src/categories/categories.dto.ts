import { IsNotEmpty, IsString, Max } from "class-validator";

export class AddCategory {
  @IsString()
  @IsNotEmpty()
  @Max(50)
  name: string;
}

export class RenameCategory {
  @IsString()
  @IsNotEmpty()
  @Max(50)
  oldName: string;

  @IsString()
  @IsNotEmpty()
  @Max(50)
  newName: string;
}
