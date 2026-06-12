import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';

@Update()
export class BotUpdate {

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      `
        እንኳን ደኅና መጡ። ይህ ቀዳማይ ክፍልን መማር ለሚፈልጉ ተማሪዎች መመዝገብያ ቦት ነው።

        Available commands:

        /register (ለመመዝገብ)
        /help (እርዳታ)
      `
    );
  }

  @Command("help")
  async help(@Ctx() ctx: Context) {
    await ctx.reply(`
        Available commands:

        /register (ለመመዝገብ)
        /help (እርዳታ)
        `)
  }

  @Command("register")
  async register(@Ctx() ctx: any) {
    return ctx.scene.enter('register-wizard');
  }
}
