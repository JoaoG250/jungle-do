import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task, Comment, User } from "@repo/db";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RABBITMQ_CLIENTS, RABBITMQ_QUEUES } from "@repo/common/constants";
import { ConfigKeys } from "../config.schema";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment, User]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_CLIENTS.NOTIFICATIONS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>(ConfigKeys.RABBITMQ_URL)],
            queue: RABBITMQ_QUEUES.NOTIFICATIONS_QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
