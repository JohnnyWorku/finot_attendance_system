import { Controller, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/sign-in.dto";
import { Public } from "src/decorators/public.decorator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup
  @Public()
  @Post("signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // signin
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("login")
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.userId, signInDto.password);
  }

  // signout
  @Post("logout")
  signOut() {}
}
