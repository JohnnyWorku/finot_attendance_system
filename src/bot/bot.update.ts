import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';

@Update()
export class BotUpdate {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      "እንኳን ደኅና መጡ። ይህ ቀዳማይ ክፍልን መማር ለሚፈልጉ ተማሪዎች መመዝገብያ ቦት ነው።"
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
  async register(@Ctx() ctx: WizardContext) {
    await ctx.scene.enter('register-scene')
//     const student = await this.userService.create(createUserDto);

//     await ctx.reply(
//         "በተሳካ ኹኔታ ተመዝግበዋል። ስለ ተመዘገቡ እናመሰግናለን።"
//     );
  }
}
