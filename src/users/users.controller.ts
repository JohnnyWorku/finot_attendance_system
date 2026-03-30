import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { usersRole } from "src/enums/users.roles.enum";
// import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(usersRole.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(usersRole.ADMIN)
  findAll(@Query("role") role?: usersRole) {
    return this.usersService.findAll(role);
  }

  @Get(":userId")
  findOne(@Param("userId") userId?: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(":userId")
  update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
