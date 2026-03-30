import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { usersRole } from "src/enums/users.roles.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // // Implement the auto generation of userId

    // let count = await this.userRepository.count({
    //   where: {
    //     firstName: createUserDto.firstName,
    //     lastName: createUserDto.lastName,
    //   },
    // });

    // userId = `ft_${createUserDto.firstName.slice(0, 3).toLowerCase()}_${createUserDto.lastName.slice(0, 2).toLowerCase()}_${(count + 1).toString().padStart(3, "0")}`;

    const newUser = this.userRepository.create({
      ...createUserDto,
      // userId,
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

  async findOne(userId?: string) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) throw new NotFoundException(`User with id ${userId} not found.`);
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const updatedDto = {
      ...updateUserDto,
      dateOfBirth: updateUserDto.dateOfBirth
        ? new Date(updateUserDto.dateOfBirth)
        : null,
    };
    await this.userRepository.update(userId, updatedDto);
    return this.findOne(userId);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
