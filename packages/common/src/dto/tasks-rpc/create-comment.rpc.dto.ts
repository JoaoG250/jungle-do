import { IsString, IsNotEmpty } from "class-validator";

export class CreateCommentRpcDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
