import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  app.setGlobalPrefix("api/v1");

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`App running on port ${port}`)
}

void bootstrap();
