import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepo.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepo.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { age, email } = createUserDto;

    return this.usersRepo.create({
      userId: crypto.randomUUID(),
      age,
      email,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
    return this.usersRepo.findOneAndUpdate({ userId }, user);
  }
}
