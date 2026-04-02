import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserIdGenerator } from "./helper_functions/user.id.generator";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserIdGenerator],
  exports: [UsersService, UserIdGenerator],
})
export class UsersModule {}
