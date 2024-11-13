import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { DatabaseModule } from '../../../../infra/database/database.module';
import { GetAllUsersUseCase } from '../../../../modules/user/useCases/getAllUsersUseCase/getAllUsersUseCase';
import { EditUserUseCase } from '../../../../modules/user/useCases/editUserUseCase/editUserUseCase';
import { DeleteUserUseCase } from '../../../../modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { UpdateImageUseCase } from '../../../../modules/user/useCases/updateImageUseCase/updateImageUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
    UpdateImageUseCase,
  ],
})
export class UserModule {}
