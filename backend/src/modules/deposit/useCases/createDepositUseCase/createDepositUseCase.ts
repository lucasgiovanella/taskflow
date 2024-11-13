import { Injectable } from '@nestjs/common';
import { Deposit } from '../../entities/deposit';
import { DepositRepository } from '../../repositories/depositRepository';
import { EquipWithSameNameException } from '../../exceptions/EquipWithSameNameException';

interface CreateDepositRequest {
  name: string;
  year: number;
  addedBy: string;
  notes?: string;
  inUse?: boolean;
  model: string;
}

@Injectable()
export class CreateDepositUseCase {
  constructor(private depositRepository: DepositRepository) {}

  async execute({ name, year, addedBy, notes, inUse, model }: CreateDepositRequest) {
    const depositAlreadyExist = await this.depositRepository.findByName(name);

    if (depositAlreadyExist) throw new EquipWithSameNameException();

    const item = new Deposit({
      name,
      year,
      addedBy,
      notes,
      inUse,
      model,
    });

    await this.depositRepository.create(item);

    return item;
  }
}
