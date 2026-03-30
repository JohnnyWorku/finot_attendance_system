import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/sign-in.dto";
import { Public } from "src/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup
  @Public()
  @Post("signup")
  signUp() {}

  // signin
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("login")
  signIn(signInDto: signInDto) {
    return this.authService.signIn(signInDto.userId, signInDto.password);
  }

  // signout
  @Post("logout")
  signOut() {}
}
