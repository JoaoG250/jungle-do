import { IsString, IsOptional, IsEnum, IsArray } from "class-validator";
import { PRIORITY, STATUS } from "../../constants";
import type { Priority, Status } from "../../constants";

export class UpdateTaskRpcDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(PRIORITY)
  @IsOptional()
  priority?: Priority;

  @IsEnum(STATUS)
  @IsOptional()
  status?: Status;

  @IsOptional()
  dueDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assigneeIds?: string[];

  @IsString()
  @IsOptional()
  authorId?: string;
}
