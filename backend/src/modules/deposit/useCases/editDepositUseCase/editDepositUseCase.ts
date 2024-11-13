import { Injectable } from '@nestjs/common';
import { DepositRepository } from '../../repositories/depositRepository';
import { DepositNotFoundException } from '../../exceptions/EquipNotFoundException';
import { EquipWithSameNameException } from '../../exceptions/EquipWithSameNameException';

interface EditDepositRequest {
  id: string;
  name?: string;
  year?: number;
  addedBy?: string;
  notes?: string;
  inUse?: boolean;
  model?: string;
}

@Injectable()
export class EditDepositUseCase {
  constructor(private depositRepository: DepositRepository) {}

  async execute({
    name,
    year,
    addedBy,
    notes,
    id,
    inUse,
    model,
  }: EditDepositRequest) {
    
    const deposit = await this.depositRepository.findById(id);
    if (!deposit) throw new DepositNotFoundException();

    if (name) {
      const depositByName = await this.depositRepository.findByName(name);
      if (depositByName && depositByName.id !== id) {
        throw new EquipWithSameNameException();
      }
    }

    deposit.name = name ?? deposit.name;
    deposit.year = year ?? deposit.year;
    deposit.addedBy = addedBy ?? deposit.addedBy;
    deposit.model = model ?? deposit.model;
    deposit.notes = notes ?? deposit.notes;
    deposit.inUse = inUse ?? deposit.inUse;

    await this.depositRepository.save(deposit);

    return deposit;
  }
}
