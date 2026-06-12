import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { BotUpdate } from './bot.update';
import { RegisterWizard } from './scenes/register.scene';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [StudentsModule,],
  providers: [BotUpdate, RegisterWizard],
  exports: [BotUpdate, RegisterWizard],
})
export class BotModule {}
