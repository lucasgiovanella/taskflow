import { Role } from '@prisma/client';
import { UserRepository } from '../../repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

interface EditUserRequest {
  id: string;
  name?: string;
  role?: Role;
  imageId?: string;
  password?: string;
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ id, name, role, imageId, password }: EditUserRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, {
      name,
      role,
      imageId,
      password: password ? await hash(password, 10) : user.password,
    });

    await this.userRepository.update(user);
  }
}
