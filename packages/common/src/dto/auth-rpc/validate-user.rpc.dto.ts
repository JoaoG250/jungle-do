import { IsString, IsEmail, MinLength } from "class-validator";

export class ValidateUserRpcDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  pass: string;
}
