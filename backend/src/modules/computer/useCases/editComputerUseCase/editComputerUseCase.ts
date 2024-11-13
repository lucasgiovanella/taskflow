import { DepositRepository } from '../../../../modules/deposit/repositories/depositRepository';
import { ComputerRepository } from '../../repositories/computerRepository';
import { ComputerNotFoundException } from '../../exceptions/ComputerNotFoundException';
import { Computer } from '../../entities/Computer';
import { Injectable } from '@nestjs/common';
import { Deposit } from 'src/modules/deposit/entities/deposit';

interface EditComputerRequest {
  id: string;
  updatedBy: string;
  computerName?: string;
  responsible?: string;
  local?: string;
  macAddress?: string;
  replace?: string;
  pendences?: string;
  checked?: boolean;
  status?: boolean;
}

@Injectable()
export class EditComputerUseCase {
  constructor(
    private computerRepository: ComputerRepository,
    private depositRepository: DepositRepository,
  ) {}

  private async moveToDepositIfNecessary(computer: Computer): Promise<void> {
    const name = computer.computerName.split('-')[0];
    const computerInDeposit = await this.depositRepository.findByName(name);

    if (computerInDeposit && computer.type === 'REMO') {
      computerInDeposit.inUse = false;
      await this.depositRepository.save(computerInDeposit);
    } else if (computerInDeposit && computer.type === 'ADD') {
      computerInDeposit.inUse = true;
      await this.depositRepository.save(computerInDeposit);
    }
  }

  // private async createComputerInDeposit(computer: Computer): Promise<void> {
  //   // Extrai o nome base do computador (antes do hífen)
  //   const name = computer.computerName.split('-')[0];
  //   const computerInDeposit = await this.depositRepository.findByName(name);

  //   if (!computerInDeposit) {
  //     // Cria novo depósito com informações do computador
  //     const newDeposit = new Deposit({
  //       name,
  //       model: computer.type === 'NOTEBOOK' ? 'Notebook' : 'Desktop',
  //       addedBy: computer.updatedBy,
  //       inUse: computer.type === 'ADD' ? true : false,
  //       year: new Date().getFullYear(),
  //       notes: `Computador ${computer.computerName} adicionado automaticamente ao depósito`,
  //     });

  //     await this.depositRepository.save(newDeposit);
  //   }
  // }

  async execute(data: EditComputerRequest): Promise<void> {
    const computer = await this.computerRepository.findById(data.id);
    if (!computer) throw new ComputerNotFoundException();

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
    } = data;

    // Move o computador para o depósito, se necessário
    if (computer.computerName && checked) {
      // await this.createComputerInDeposit(computer);
      await this.moveToDepositIfNecessary(computer);
    }

    // Atualiza todas as propriedades de uma vez, usando valores atuais ou novos
    Object.assign(computer, {
      computerName: computerName ?? computer.computerName,
      responsible: responsible ?? computer.responsible,
      local: local ?? computer.local,
      macAddress: macAddress ?? computer.macAddress,
      replace: replace ?? computer.replace,
      pendences: pendences ?? computer.pendences,
      status: status ?? computer.status,
      checked: checked ?? computer.checked,
      updatedBy: updatedBy ?? computer.updatedBy,
    });

    // Salva o computador atualizado
    await this.computerRepository.save(computer);
  }
}
