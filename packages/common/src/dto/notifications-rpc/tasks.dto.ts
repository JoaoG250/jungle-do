import { IsNotEmpty, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";

export class AssigneeDto {
  @Expose()
  id: string;
}

export class TaskCreatedRpcDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @Type(() => AssigneeDto)
  assignees: AssigneeDto[];
}

export class TaskUpdatedRpcDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @Type(() => AssigneeDto)
  assignees: AssigneeDto[];
}
