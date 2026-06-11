import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //   Sign Up
  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const signInInfo = {
      userId: user.userId,
      password: user.password,
    };

    const token = await this.signIn(signInInfo);

    return { user: { ...user }, token: { ...token } };
  }

  //   Sign In
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUserId(signInDto.userId);

    const isMatch = await bcrypt.compare(
      signInDto.password,
      user.password
    )

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, userId: user.userId };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  // Sign Out
  async signOut() {
    // It will be handled on frontend.
  }
}
