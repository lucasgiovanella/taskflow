import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { GetAllUsersUseCase } from '../../../../modules/user/useCases/getAllUsersUseCase/getAllUsersUseCase';
import { UpdateImageUseCase } from '../../../../modules/user/useCases/updateImageUseCase/updateImageUseCase';
import { DeleteUserUseCase } from '../../../../modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { EditUserUseCase } from '../../../../modules/user/useCases/editUserUseCase/editUserUseCase';
import { EditUSerBody } from './dtos/editUserBody';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly editUserUseCase: EditUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateImageUseCase: UpdateImageUseCase,
  ) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
    });

    return UserViewModel.toHttp(user);
  }

  @Get()
  async getAll() {
    const users = await this.getAllUsersUseCase.execute();
    return users.map(UserViewModel.toHttp);
  }

  @Put(':id')
  async editUser(@Body() body: EditUSerBody, @Param('id') id: string) {
    const { name, password, role, imageId } = body;

    await this.editUserUseCase.execute({
      id,
      name,
      password,
      role,
      imageId,
    });
  }

  @Put(':id/image')
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'public/images';
          // Criar o diretório se não existir
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type.'), false);
        }
      },
    }),
  )
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      if (!avatar) {
        throw new HttpException(
          'A imagem de perfil é obrigatória.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Atualizar o usuário com o novo nome do arquivo
      const imageUrl = `/public/images/${avatar.filename}`; // Caminho relativo para acesso via HTTP
      await this.updateImageUseCase.execute({
        id,
        imageId: imageUrl,
      });

      return {
        status: 200,
        message: 'Imagem de perfil atualizada com sucesso.',
        data: {
          imageUrl,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar imagem',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
  }

  // Método para mover o arquivo
  private async moveFile(file: any, uploadPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      file.mv(uploadPath, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  // Método para gerar um ID único
  private generateUniqueId(): string {
    return Date.now().toString(); // Exemplo simples de geração de ID único
  }
}
