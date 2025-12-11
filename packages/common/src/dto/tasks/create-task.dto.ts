import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
} from "class-validator";
import { PRIORITY, STATUS } from "../../constants";
import type { Priority, Status } from "../../constants";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

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
}
