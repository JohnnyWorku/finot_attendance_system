import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
    imports: [
        TelegrafModule.forRoot({
            token: process.env.TELEGRAM_BOT_TOKEN!,
        })
    ],
    providers: [BotUpdate],
})
export class BotModule {}
