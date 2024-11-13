import { Injectable } from "@nestjs/common";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

@Injectable()
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
