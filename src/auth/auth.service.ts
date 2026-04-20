import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //   Sign Up
  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return this.signIn(user.userId, user.password);
  }

  //   Sign In
  async signIn(
    userId: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUserId(userId);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, userId: user.userId };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  // Sign Out
  async signOut() {
    // It will be handled on frontend.
  }
}
