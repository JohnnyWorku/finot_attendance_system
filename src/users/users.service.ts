import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { usersRole } from "src/enums/users.roles.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: Partial<User>) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(role?: usersRole) {
    if (role) {
      return this.userRepository.find({ where: { role } });
    }
    return this.userRepository.find();
  }

  async findOne(id?: number, username?: string) {
    if (id) {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new NotFoundException(`User #${id} not found.`);
      return user;
    }

    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException(`User with ${username} not found.`);
    return user;
  }

  async update(id: number, updateUserDto: Partial<User>) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
