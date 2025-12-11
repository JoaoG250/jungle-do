import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserRpcDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  pass: string;
}
