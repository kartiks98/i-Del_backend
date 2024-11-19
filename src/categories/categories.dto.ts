import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AddCategory {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}

export class RenameCategory {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  oldName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  newName: string;
}
