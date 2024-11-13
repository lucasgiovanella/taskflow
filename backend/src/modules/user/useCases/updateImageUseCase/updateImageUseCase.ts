import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

interface IRequest {
  id: string;
  imageId: string;
}

interface IResponse {
  imageUrl: string;
}

@Injectable()
export class UpdateImageUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, imageId }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Se existir uma imagem antiga, remove ela
    if (user.imageId) {
      const oldImagePath = join(process.cwd(), 'public/images', user.imageId);
      if (existsSync(oldImagePath)) {
        try {
          unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error removing old image:', error);
        }
      }
    }

    // Gera a URL da imagem para retornar ao frontend
    const imageUrl = `/public/images/${imageId}`;

    // Atualiza o avatar do usuário
    await this.userRepository.updateAvatar(id, imageId);

    return { imageUrl };
  }
}
