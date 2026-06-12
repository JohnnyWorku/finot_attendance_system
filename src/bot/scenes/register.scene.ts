import { Wizard, WizardStep } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';
import { suitableTimeKeyboard } from '../keyboards/suitable.time.keyboard';
import { StudentsService } from 'src/students/students.service';

@Wizard('register-wizard')
export class RegisterWizard {
  constructor(private readonly studentsService: StudentsService) {}

  @WizardStep(1)
  async step1(ctx: any) {
    await ctx.reply('ሙሉ ስምዎን ያስገቡ');
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(ctx: any) {
    ctx.wizard.state.fullName = ctx.message.text;

    await ctx.reply('የክርስትና ስምዎን ያስገቡ');
    ctx.wizard.next();
  }

  @WizardStep(3)
  async step3(ctx: any) {
    ctx.wizard.state.baptismName = ctx.message.text;

    await ctx.reply('እድሜዎን ያስገቡ');
    ctx.wizard.next();
  }

  @WizardStep(4)
  async step4(ctx: any) {
    ctx.wizard.state.age = ctx.message.text;

    await ctx.reply('ስልክ ቁጥርዎን ያስገቡ');
    ctx.wizard.next();
  }

  @WizardStep(5)
  async step5(ctx: any) {
    ctx.wizard.state.phoneNumber = ctx.message.text;

    await ctx.reply('በዓለማዊ ትምህርት የሚማሩበትን የትምህርት ደረጃ ያስገቡ (ሠራተኛ ከኾኑ ሠራተኛ ብለው ይሙሉ)');
    ctx.wizard.next();
  }

  @WizardStep(6)
  async step6(ctx: any) {
    ctx.wizard.state.learningStatus = ctx.message.text;

    await ctx.reply(
      'የሚመችዎትን ጊዜ ይምረጡ',
      suitableTimeKeyboard,
    );

    ctx.wizard.next();
  }

  @WizardStep(7)
  async step7(ctx: any) {
    ctx.wizard.state.suitableTime = ctx.message.text;

    const dto = {
      fullName: ctx.wizard.state.fullName,
      baptismName: ctx.wizard.state.baptismName,
      age: ctx.wizard.state.age,
      phoneNumber: ctx.wizard.state.phoneNumber,
      learningStatus: ctx.wizard.state.learningStatus,
      suitableTime: ctx.wizard.state.suitableTime,
    };

    await this.studentsService.create(dto);

    await ctx.reply('በተሳካ ኹኔታ ተመዝግበዋል ✅');

    return ctx.scene.leave();
  }
}
