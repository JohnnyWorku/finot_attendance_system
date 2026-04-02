import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserIdGenerator {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Helper function to generate userId
  async generateUserId(createUserDto: CreateUserDto): Promise<string> {
    const { userFullName, userRole } = createUserDto;

    const splitted_full_name = userFullName.split(" ");

    if (splitted_full_name.length < 3)
      throw new BadRequestException(
        "userFullName name must be at least 3 characters long",
      );

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
      const lastSeq = parseInt(parts[4], 10);
      nextSequence = (lastSeq + 1).toString().padStart(3, "0");
    }

    return `ft_${first3}_${middle2}_${last2}_${nextSequence}_${userRole}`;
  }
}
