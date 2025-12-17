import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { ConfigKeys } from "./config.schema";
import { RABBITMQ_QUEUES } from "@repo/common/constants";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@repo/common/logger";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      bufferLogs: true,
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>(ConfigKeys.RABBITMQ_URL)],
        queue: RABBITMQ_QUEUES.TASKS_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen();
}
void bootstrap();
