import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RABBITMQ_QUEUES } from "@repo/common/constants";
import { ConfigService } from "@nestjs/config";
import { ConfigKeys } from "./config.schema";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>(ConfigKeys.RABBITMQ_URL)],
      queue: RABBITMQ_QUEUES.NOTIFICATIONS_QUEUE,
      queueOptions: {
        durable: false,
      },
      noAck: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get<number>(ConfigKeys.PORT) ?? 3004);
}
void bootstrap();
