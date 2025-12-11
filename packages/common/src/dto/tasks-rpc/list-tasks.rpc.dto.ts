import { IsOptional, IsEnum, IsInt, Min, IsString } from "class-validator";
import { PRIORITY, STATUS } from "../../constants";
import type { Priority, Status } from "../../constants";

export class ListTasksRpcDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsEnum(STATUS)
  @IsOptional()
  status?: Status;

  @IsEnum(PRIORITY)
  @IsOptional()
  priority?: Priority;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  assigneeId?: string;
}
