import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task, Comment, User } from "@repo/db";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Task, Comment, User])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
