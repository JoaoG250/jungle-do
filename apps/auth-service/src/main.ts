import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { ConfigKeys } from "./config.schema";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>(ConfigKeys.RABBITMQ_URL)],
        queue: "auth_queue",
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
void bootstrap();
