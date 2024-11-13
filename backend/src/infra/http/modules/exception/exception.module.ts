import { DatabaseModule } from '../../../../infra/database/database.module';
import { Module } from '@nestjs/common';
import { ExceptionController } from './exception.controller';
import { CreateExceptionUseCase } from '../../../../modules/exception/useCases/createExceptionUseCase/createExceptionUseCase';
import { EditExceptionUseCase } from '../../../../modules/exception/useCases/editExceptionUseCase/editExceptionUseCase';
import { DeleteExceptionUseCase } from '../../../../modules/exception/useCases/deleteExceptionUseCase/deleteExceptionUseCase';
import { GetExceptionUseCase } from '../../../../modules/exception/useCases/getExceptionUseCase/getExceptionUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ExceptionController],
  providers: [
    CreateExceptionUseCase,
    EditExceptionUseCase,
    DeleteExceptionUseCase,
    GetExceptionUseCase,
  ],
})
export class ExceptionModule {}
