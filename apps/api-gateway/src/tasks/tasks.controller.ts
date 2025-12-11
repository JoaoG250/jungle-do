import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  CreateTaskDto,
  UpdateTaskDto,
  CreateCommentDto,
  TaskResponse,
  CommentResponse,
} from "@repo/common/dto/tasks";
import { ListTasksRpcDto } from "@repo/common/dto/tasks-rpc";
import { TasksService } from "./tasks.service";
import type { HttpRequest } from "src/types";

@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponse> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query() query: ListTasksRpcDto,
  ): Promise<{ tasks: TaskResponse[]; total: number }> {
    return this.tasksService.findAll(query);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    await this.tasksService.remove(id);
  }

  @Post(":id/comments")
  async createComment(
    @Param("id") taskId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: HttpRequest,
  ): Promise<CommentResponse> {
    return this.tasksService.createComment(
      taskId,
      createCommentDto,
      req.user.id,
    );
  }

  @Get(":id/comments")
  async findAllComments(
    @Param("id") taskId: string,
  ): Promise<CommentResponse[]> {
    return this.tasksService.findAllComments(taskId);
  }
}
