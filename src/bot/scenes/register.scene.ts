import { Wizard, WizardStep } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';
import { enrollmentKeyboard } from '../keyboards/enrollmets.keyboard';

@Wizard('register-wizard')
export class RegisterWizard {
  constructor(
      private readonly userService: UsersService,
    ) {}

  @WizardStep(1)
  async step1(ctx: WizardContext) {
    await ctx.reply('የተማሪውን ሙሉ ስም ያስገቡ');
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(ctx: any) {
    ctx.wizard.state.userFullName = ctx.message.text;

    await ctx.reply('የተማሪውን ስልክ ቁጥር ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(3)
  async step3(ctx: any) {
    ctx.wizard.state.userPhone = ctx.message.text;

    await ctx.reply('የተማሪውን ኢሜይል ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(4)
  async step4(ctx: any) {
    ctx.wizard.state.userEmail = ctx.message.text;

    await ctx.reply('የተማሪውን ወላጅ አባት ሙሉ ስም ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(5)
  async step5(ctx: any) {
    ctx.wizard.state.fatherName = ctx.message.text;

    await ctx.reply('የተማሪውን ወላጅ አባት ስልክ ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(6)
  async step6(ctx: any) {
    ctx.wizard.state.fatherPhone = ctx.message.text;

    await ctx.reply('የተማሪውን ወላጅ እናት ሙሉ ስም ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(7)
  async step7(ctx: any) {
    ctx.wizard.state.motherName = ctx.message.text;

    await ctx.reply('የተማሪውን ወላጅ እናት ስልክ ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(8)
  async step8(ctx: any) {
    ctx.wizard.state.motherPhone = ctx.message.text;

    await ctx.reply('የተማሪውን መኖርያ አድራሻ ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(9)
  async step9(ctx: any) {
    ctx.wizard.state.address = ctx.message.text;

    await ctx.reply('የተማሪው የትውልድ ቀን (እንደ ኢትዮጵያውያን አቆጣጠር) ያስገቡ');

    ctx.wizard.next();
  }

  @WizardStep(10)
  async step10(ctx: any) {
    ctx.wizard.state.dateOfBirth = ctx.message.text;

    await ctx.reply(
      'ተማሪው ሌላ ሰንበት ትምህርት ቤት ተምረዋል?',
      enrollmentKeyboard
    );

    ctx.wizard.state.otherSundaySchoolEnrollment = ctx.message.text;

    ctx.wizard.next();
  }

  @WizardStep(11)
  async final(ctx: any) {
    const dto = {
      userFullName: ctx.wizard.state.userFullName,
      userPhone: ctx.wizard.state.userPhone,
      userEmail: ctx.wizard.state.userEmail,
      fatherName: ctx.wizard.state.fatherName,
      fatherPhone: ctx.wizard.state.fatherPhone,
      motherName: ctx.wizard.state.motherName,
      motherPhone: ctx.wizard.state.motherPhone,
      address: ctx.wizard.state.address,
      dateOfBirth: ctx.wizard.state.dateOfBirth,
      otherSundaySchoolEnrollment: ctx.wizard.state.otherSundaySchoolEnrollment,
    }

    await this.userService.create(dto);

    await ctx.reply(
        "በተሳካ ኹኔታ ተመዝግበዋል። ስለ ተመዘገቡ እናመሰግናለን።"
    );

    await ctx.scene.leave();
  }
}