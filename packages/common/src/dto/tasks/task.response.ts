import { Priority, Status } from "../../constants";
import { CommentResponse } from "./comment.response";

export class TaskResponse {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
  assigneeIds: string[];
  comments: CommentResponse[];
  createdAt: Date;
  updatedAt: Date;
}
