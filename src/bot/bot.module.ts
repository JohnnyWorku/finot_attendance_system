import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { BotUpdate } from './bot.update';
import { RegisterWizard } from './scenes/register.scene';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    StudentsModule,
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN!,
      middlewares: [session()],
      launchOptions: {
        webhook: {
          domain: process.env.WEBHOOK_DOMAIN!,
          hookPath: '/api/v1/telegram/webhook',
        },
      },
    }),
  ],
  providers: [BotUpdate, RegisterWizard],
})
export class BotModule {}
