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

  // Helper function to generate userId
  private async generateUserId(createUserDto: CreateUserDto): Promise<string> {
    const { userFullName, userRole } = createUserDto;

    const splitted_full_name = userFullName.split(" ");
    const first3 = splitted_full_name[0].slice(0, 3).toLowerCase();
    const middle2 = splitted_full_name[1].slice(0, 2).toLowerCase();
    const last2 = splitted_full_name[2].slice(0, 2).toLowerCase();

    // Find the last userId that matches the pattern
    const lastUser = await this.userRepository
      .createQueryBuilder("user")
      .where("user.userId LIKE :pattern", {
        pattern: `ft_${first3}_${middle2}_${last2}_%_${userRole}`,
      })
      .orderBy("user.createdAt", "DESC")
      .getOne();

    // Extract the last sequence number
    let nextSequence = "001";
    if (lastUser) {
      const parts = lastUser.userId.split("_");
      const lastSeq = parseInt(parts[3], 10);
      nextSequence = (lastSeq + 1).toString().padStart(3, "0");
    }

    return `ft_${first3}_${last2}_${nextSequence}_${userRole}`;
  }

  // transaction concept is not considered yet
  async create(createUserDto: CreateUserDto) {
    const userId = await this.generateUserId(createUserDto);

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
