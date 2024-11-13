import { CreateExceptionUseCase } from '../../../../modules/exception/useCases/createExceptionUseCase/createExceptionUseCase';
import { DeleteExceptionUseCase } from '../../../../modules/exception/useCases/deleteExceptionUseCase/deleteExceptionUseCase';
import { EditExceptionUseCase } from '../../../../modules/exception/useCases/editExceptionUseCase/editExceptionUseCase';
import { GetExceptionUseCase } from '../../../../modules/exception/useCases/getExceptionUseCase/getExceptionUseCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExceptionViewModel } from './viewModels/exceptionViewModule';
import { CreateExceptionBody } from './dtos/createExceptionBody';
import { EditExceptionBody } from './dtos/editExceptionBody';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exception')
@Controller('api/exception')
export class ExceptionController {
  constructor(
    private readonly createExceptionUseCase: CreateExceptionUseCase,
    private readonly deleteExceptionUseCase: DeleteExceptionUseCase,
    private readonly editExceptionUseCase: EditExceptionUseCase,
    private readonly getExceptionUseCase: GetExceptionUseCase,
  ) {}

  @Post()
  async createException(@Body() body: CreateExceptionBody) {
    const { computerName, addedBy, notes, software } = body;

    const item = await this.createExceptionUseCase.execute({
      computerName,
      addedBy,
      updatedBy: addedBy,
      notes,
      software,
    });

    return ExceptionViewModel.toHttp(item);
  }

  @Get()
  async getException() {
    const items = await this.getExceptionUseCase.execute();

    return items.map(ExceptionViewModel.toHttp);
  }

  @Put(':id')
  async editException(
    @Param('id') id: string,
    @Body() body: EditExceptionBody,
  ) {
    const { computerName, notes, software, updatedBy } = body;

    await this.editExceptionUseCase.execute({
      id,
      computerName,
      updatedBy,
      notes,
      software,
    });
  }

  @Delete(':id')
  async deleteException(@Param('id') id: string) {
    await this.deleteExceptionUseCase.execute({
      id,
    });
  }
}
