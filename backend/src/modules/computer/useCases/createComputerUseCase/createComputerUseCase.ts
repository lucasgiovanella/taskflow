import { ComputerType } from '@prisma/client';
import { Computer } from '../../entities/Computer';
import { ComputerRepository } from '../../repositories/computerRepository';
import { DepositRepository } from '../../../../modules/deposit/repositories/depositRepository';
import { Injectable } from '@nestjs/common';

interface CreateComputerRequest {
  computerName: string;
  responsible: string;
  type: ComputerType;
  updatedBy?: string;
  local?: string;
  macAddress?: string;
  replace?: string;
  pendences?: string;
  checked?: boolean;
  isDroped?: boolean;
}

@Injectable()
export class CreateComputerUseCase {
  constructor(
    private computerRepository: ComputerRepository,
    private depositRepository: DepositRepository,
  ) {}

  async execute(data: CreateComputerRequest) {
    if (data.type === 'ADD') {
      data.pendences = `-Rótulo e Local no Kace;\n-Registro licenças;\n-Atribuição WSUS;\n-Planilha de exceções do Drive;`;
    } else {
      data.pendences = `-Remover KACE;\n-Remover Domínio;\n-Remover WSUS;\n-Remover Kaspersky;\n-Remover Zabbix;\n-Planilha de exceções do Drive;`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.responsible)) {
      data.responsible = `${data.responsible}@univates.br`;
    }

    const computer = new Computer(data);

    await this.computerRepository.create(computer);

    return computer;
  }
}
