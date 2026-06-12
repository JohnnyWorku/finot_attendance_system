import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import axios from "axios";

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

  try {
    console.log('Testing outbound connection to Telegram...');
    const response = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`);
    console.log('Outbound Connection Success! Bot Info:', response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Outbound Connection FAILED to reach Telegram:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

void bootstrap();
