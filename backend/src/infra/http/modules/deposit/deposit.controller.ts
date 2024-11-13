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
import { CreateDepositUseCase } from '../../../../modules/deposit/useCases/createDepositUseCase/createDepositUseCase';
import { CreateDepositBody } from './dtos/createDepositBody';
import { DepositViewModel } from './viewModels/depositViewModel';
import { DeleteDepositUseCase } from '../../../../modules/deposit/useCases/deleteDepositUseCase/deleteDepositUseCase';
import { EditDepositUseCase } from '../../../../modules/deposit/useCases/editDepositUseCase/editDepositUseCase';
import { EditDepositBody } from './dtos/editDepositBody';
import { GetManyDepositUseCase } from '../../../../modules/deposit/useCases/getManyUseCase/getManyUseCase';
import { ApiTags } from '@nestjs/swagger';
import { SocketService } from '../../../../infra/gateway/socket.service';

@ApiTags('Deposit')
@Controller('api/deposit')
export class DepositController {
  constructor(
    private readonly createDepositUseCase: CreateDepositUseCase,
    private readonly deleteDepositUseCase: DeleteDepositUseCase,
    private readonly editDepositUseCase: EditDepositUseCase,
    private readonly getManyDepositUseCase: GetManyDepositUseCase,
    private readonly socketService: SocketService,
  ) {}

  @Post()
  async createDeposit(@Body() body: CreateDepositBody) {
    const { name, year, addedBy, notes, model, inUse } = body;

    const item = await this.createDepositUseCase.execute({
      name,
      year,
      addedBy,
      notes,
      model,
      inUse,
    });

    this.socketService.emitDepositCreate();

    return DepositViewModel.toHttp(item);
  }

  @Get()
  async getManyDeposits(@Query('inUse') inUse: string) {
    const use = inUse === 'true';
    const deposits = await this.getManyDepositUseCase.execute({
      inUse: use,
    });

    return deposits.map(DepositViewModel.toHttp);
  }

  @Put(':id')
  async editDeposit(@Param('id') id: string, @Body() body: EditDepositBody) {
    const { name, year, addedBy, notes, inUse, model } = body;
    await this.editDepositUseCase.execute({
      id,
      name,
      year,
      addedBy,
      notes,
      inUse,
      model,
    });

    this.socketService.emitDepositUpdate();
  }

  @Delete(':id')
  async deleteDeposit(
    @Param('id') id: string,
  ) {
    await this.deleteDepositUseCase.execute({
      id,
    });

    this.socketService.emitDepositDelete();
  }
}
