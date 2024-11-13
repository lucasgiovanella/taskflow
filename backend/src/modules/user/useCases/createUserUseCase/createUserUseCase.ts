import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';
import { Role } from '@prisma/client';

interface CreateUserRequest {
  email: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name }: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserWithSameEmailException();

    const passwordDefault = await hash(`${process.env.DEFAULT_PASSWORD}`, 10);
    const role = Role.MODERATOR;
    const imageId = '/public/images/placeholder_default.png';

    const user = new User({
      email,
      name,
      role,
      imageId,
      password: passwordDefault,
    });

    await this.userRepository.create(user);

    return user;
  }
}
