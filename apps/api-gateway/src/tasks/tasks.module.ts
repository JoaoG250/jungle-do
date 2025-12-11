import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { RABBITMQ_CLIENTS, RABBITMQ_QUEUES } from "@repo/common/constants";
import { ConfigKeys } from "../config.schema";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_CLIENTS.TASKS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>(ConfigKeys.RABBITMQ_URL)],
            queue: RABBITMQ_QUEUES.TASKS_QUEUE,
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
  exports: [TasksService],
})
export class TasksModule {}
