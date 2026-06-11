import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {

  @Start()
  async start(ctx: Context) {
    await ctx.reply(
      "እንኳን ደኅና መጡ። ይህ ቀዳማይ ክፍልን መማር ለሚፈልጉ ተማሪዎች መመዝገብያ ቦት ነው።"
    );
  }

}