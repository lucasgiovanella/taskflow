import { CreateComputerUseCase } from '../../../../modules/computer/useCases/createComputerUseCase/createComputerUseCase';
import { DeleteComputerUseCase } from '../../../../modules/computer/useCases/deleteComputerUseCase/deleteComputerUseCase';
import { EditComputerUseCase } from '../../../../modules/computer/useCases/editComputerUseCase/editComputerUseCase';
import { GetComputerUseCase } from '../../../../modules/computer/useCases/getComputerUseCase/getComputerUseCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateComputerBody } from './dtos/createComputerBody';
import { ComputerViewModel } from './viewModels/computerViewModel';
import { EditComputerBody } from './dtos/editComputerBody';
import { ComputerType } from '@prisma/client';
import { Public } from '../auth/decorators/isPublic';
import { ApiTags } from '@nestjs/swagger';
import { SocketService } from '../../../gateway/socket.service';

@ApiTags('Computer')
@Controller('api/computer')
export class ComputerController {
  constructor(
    private readonly createComputerUseCase: CreateComputerUseCase,
    private readonly deleteComputerUseCase: DeleteComputerUseCase,
    private readonly editComputerUseCase: EditComputerUseCase,
    private readonly getComputerUseCase: GetComputerUseCase,
    private readonly socketService: SocketService,
  ) {}

  @Post('v1')
  @Public()
  async createComputerApi(@Body() body: CreateComputerBody) {
    const { computerName, responsible, replace, local, macAddress, isDroped } =
      body;

    const item = await this.createComputerUseCase.execute({
      computerName,
      type: ComputerType.ADD,
      responsible,
      replace,
      local,
      macAddress,
      isDroped,
    });

    return ComputerViewModel.toHttp(item);
  }

  @Post()
  async createComputer(@Body() body: CreateComputerBody) {
    const {
      computerName,
      type,
      responsible,
      replace,
      local,
      macAddress,
      isDroped,
    } = body;

    const item = await this.createComputerUseCase.execute({
      computerName,
      type,
      responsible,
      replace,
      local,
      macAddress,
      isDroped,
    });

    this.socketService.emitComputerCreate();

    return ComputerViewModel.toHttp(item);
  }

  @Get()
  async getComputer(
    @Query('checked') checked: string,
    @Query('type') type: ComputerType,
  ) {
    const isCheck = checked === 'true';

    const items = await this.getComputerUseCase.execute({
      checked: isCheck,
      type,
    });
    return items.map((item) => ComputerViewModel.toHttp(item));
  }

  @Put(':id')
  async editComputer(@Param('id') id: string, @Body() body: EditComputerBody) {
    const {
      computerName,
      responsible,
      local,
      macAddress,
      replace,
      pendences,
      checked,
      updatedBy,
      status,
    } = body;
    await this.editComputerUseCase.execute({
      id,
      computerName,
      responsible,
      local,
      macAddress,
      replace,
      pendences,
      checked,
      updatedBy,
      status,
    });

    this.socketService.emitComputerUpdate();
  }

  @Delete(':id')
  async deleteComputer(@Param('id') id: string, @Body() updatedBy: string) {
    await this.deleteComputerUseCase.execute({
      id,
      updatedBy,
    });
    this.socketService.emitComputerDelete();
  }
}
