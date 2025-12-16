import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { PRIORITY, STATUS, type Priority, type Status } from "../../constants";
import type {
  CommentResponse as ICommentResponse,
  TaskResponse as ITaskResponse,
} from "@repo/types/tasks";

@Exclude()
export class CommentResponse implements ICommentResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  authorId: string;

  @ApiProperty()
  @Expose()
  taskId: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}

@Exclude()
export class TaskResponse implements ITaskResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty({ enum: PRIORITY })
  @Expose()
  priority: Priority;

  @ApiProperty({ enum: STATUS })
  @Expose()
  status: Status;

  @ApiProperty()
  @Expose()
  dueDate: Date;

  @ApiProperty({ type: [String] })
  @Expose()
  assigneeIds: string[];

  @ApiProperty({ type: [CommentResponse] })
  @Expose()
  @Type(() => CommentResponse)
  comments: CommentResponse[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
