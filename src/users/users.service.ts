import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { usersRole } from "src/enums/users.roles.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserIdGenerator } from "src/users/helper_functions/user.id.generator";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userIdGenerator: UserIdGenerator,
  ) {}

  // transaction concept is not considered yet
  async create(createUserDto: CreateUserDto) {
    const userId = await this.userIdGenerator.generateUserId(createUserDto);

    const newUser = this.userRepository.create({
      ...createUserDto,
      userId,
      dateOfBirth: createUserDto.dateOfBirth
        ? new Date(createUserDto.dateOfBirth)
        : null,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(userRole?: usersRole) {
    if (userRole) {
      return this.userRepository.find({ where: { userRole } });
    }
    return this.userRepository.find();
  }

  async findOneById(id?: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByUserId(userId?: string) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedDto = {
      ...updateUserDto,
      dateOfBirth: updateUserDto.dateOfBirth
        ? new Date(updateUserDto.dateOfBirth)
        : null,
    };
    await this.userRepository.update(id, updatedDto);
    return this.findOneById(id);
  }

  async remove(id: string) {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
}
