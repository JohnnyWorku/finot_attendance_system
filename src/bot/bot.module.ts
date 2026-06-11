import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';
import { UsersModule } from 'src/users/users.module';
import { RegisterWizard } from './scenes/register.scene';

@Module({
    imports: [
        UsersModule,
        TelegrafModule.forRoot({
            token: process.env.TELEGRAM_BOT_TOKEN!,
        })
    ],
    providers: [
        BotUpdate,
        RegisterWizard,
    ],
})
export class BotModule {}
