import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { CreateCommentDto as ICreateCommentDto } from "@repo/types/tasks";

export class CreateCommentDto implements ICreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
